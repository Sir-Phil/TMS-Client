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
  
  interface AuthServiceEvents {
    hasLoginEvent: boolean;
    hasLogoutEvent: boolean;
    hasRegistrationEvent: boolean;
    hasSessionVerification: boolean;
  }

@Injectable()
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();


    private _authServiceEvents: AuthServiceEvents = {
        hasLoginEvent: false,
        hasLogoutEvent: false,
        hasRegistrationEvent: false,
        hasSessionVerification: false,
      };

    constructor(
        private apiService: ApiService,
        private jwtService: JWTService
        
    ){}



    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    // populate() {
    //      // If JWT detected, attempt to get & store user's info
    // if (this.jwtService.getToken()) {
    //     this.apiService.get('/user')
    //         .subscribe({
    //             next: (data) => this.setAuth(data.user),
    //             error: () => this.purgeAuth(),
    //         });
    //     } else {
    //          // Remove any potential remnants of previous auth states
    //     this.purgeAuth();
    //     }
    // }   

    // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    this._authServiceEvents.hasSessionVerification = true;
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
        .subscribe({
          next: (data) => {
            this.setAuth(data.user);
            this._authServiceEvents.hasSessionVerification = false;
          },
          error: (err) => {
            this.purgeAuth();
            this._authServiceEvents.hasSessionVerification = false;
          },
        });
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
      this._authServiceEvents.hasSessionVerification = false;
    }
  }

    private setAuth(user: User){
         // Save JWT sent from server in localstorage
        this.jwtService.saveToken(user.token);
         // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }

    private purgeAuth(){
          // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next({}  as User);
         // Set auth status to false
         this.isAuthenticatedSubject.next(false);
    }

    attemptAuth(type: 'login' | 'register', credentials: UserCredentials): Observable<User> {
        const route = (type === 'login') ? '/login' : '/register';
        this._authServiceEvents.hasRegistrationEvent = type === 'register';
        this._authServiceEvents.hasLoginEvent = type === 'login';
        return this.apiService.post('/user' + route, { user: credentials })
          .pipe(map(data => {
            this.setAuth(data.user);
            this._authServiceEvents.hasRegistrationEvent = false;
            this._authServiceEvents.hasLoginEvent = false;
            return data.user;
          }));
      }

    // register(credentials: UserCredentials): Observable<User> {
    //     return this.apiService.post('/user/register', { user: credentials })
    //       .pipe(map(data => {
    //         this.setAuth(data.user);
    //         return data.user;
    //     }));
    // }
    
    login(credentials: UserCredentials): Observable<User> {
        return this.apiService.post('/user/login', { user: credentials })
          .pipe(map(data => {
            this.setAuth(data.user);
            return data.user;
        }));
    }

    logout() {
        this.purgeAuth();
        this.apiService.get('/user/logout').subscribe(() => {
          console.log('User logged out');
        });
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }

    update(user: User): Observable<User> {
        return this.apiService
        .put('/user', {user})
        .pipe(map(data => {
            this.currentUserSubject.next(data);
            return data.user
        }));
    }

    get authServiceEvents(): AuthServiceEvents {
        return this._authServiceEvents;
      }
}   