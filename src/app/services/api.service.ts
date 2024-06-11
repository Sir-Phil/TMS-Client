import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JWTService } from "./jwt.service";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class ApiService {
    
    constructor(
        private _http: HttpClient,
        private _jwtService: JWTService
    ){}

    private formatErrors(error: any): Observable<never> {
        console.error(error);
        return throwError(() => new Error(error.message || 'Server error'));
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this._http.get(`${environment.api_url}${path}`, {params})
        .pipe(catchError(this.formatErrors)); 
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this._http.put(
            `${environment.api_url}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors))
    }

    post(path: string, body: object ={}): Observable<any>{
        return this._http.post(
            `${environment.api_url}${path}`,
            JSON.stringify(body)
        ).pipe(catchError(this.formatErrors));
    }
    
    delete(path: string): Observable<any> {
        return this._http.delete(
            `${environment.api_url}${path}`
        ).pipe(catchError(this.formatErrors))
    }
}