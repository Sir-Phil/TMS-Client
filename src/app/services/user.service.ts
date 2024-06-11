import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, ReplaySubject  } from "rxjs";
import { User } from "../core/models/user.model";
import { ApiService } from "./api.service";
import { JWTService } from "./jwt.service";
import { map, distinctUntilChanged} from 'rxjs/operators'

// Define the UserCredentials interface
interface UserCredentials {
    email: string;
    password: string;
  }
  

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private _apiService: ApiService,
        private _jwtService: JWTService
        
    ){}

    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
         // If JWT detected, attempt to get & store user's info
    if (this._jwtService.getToken()) {
        this._apiService.get('/user')
            .subscribe({
                next: (data) => this.setAuth(data.user),
                error: (err) => this.purgeAuth(),
            });
        } else {
             // Remove any potential remnants of previous auth states
        this.purgeAuth();
        }
    }   

    private setAuth(user: User){
         // Save JWT sent from server in localstorage
        this._jwtService.saveToken(user.token);
         // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }

    private purgeAuth(){
          // Remove JWT from localstorage
        this._jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next({}  as User);
         // Set auth status to false
         this.isAuthenticatedSubject.next(false);
    }

    attemptAuth(type: 'login' | 'register', credentials: UserCredentials): Observable<User>{
        const route = (type === 'login') ? '/login' : '';
        return this._apiService.post('/user' + route, {user: credentials})
        .pipe(map(
            data => {
                this.setAuth(data.user);
                return data;
            }
        ));
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }

    update(user: User): Observable<User> {
        return this._apiService
        .put('/user', {user})
        .pipe(map(data => {
            this.currentUserSubject.next(data);
            return data.user
        }));
    }
}   