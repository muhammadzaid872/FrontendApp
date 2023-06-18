import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/auth.models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        var currentUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(currentUser));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        console.log("current-user-login-status", this.currentUserSubject.value);
        return this.currentUserSubject.value;
    }
    login(email: string, password: string) {
        return this.http.post<any>(environment.backEndAPI + `/Token`, { email, password })
            .pipe(map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('loginFullName');
        localStorage.removeItem('loginUserId');
        this.currentUserSubject.next(null);
    }
}
