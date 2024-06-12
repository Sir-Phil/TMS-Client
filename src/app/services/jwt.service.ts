import { Injectable } from "@angular/core";


@Injectable()
export class JWTService {

    private tokenKey = 'jwtToken';

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);

    }

    saveToken(token: string): void{
        localStorage.setItem(this.tokenKey, token);
    }

    destroyToken(): void{
        localStorage.removeItem(this.tokenKey);
    }
}