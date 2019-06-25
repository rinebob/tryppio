import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from '../auth-data.model';
import { UserData } from '../user-data.model';

import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer;
  private userId: string;
  private username: string;
  private usernameListener = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getUserInfo() {
    const authInfo = this.getAuthData();
    // console.log('auth.s.ts getUserId(). authInfo = ', authInfo );
    // console.log('auth.s.ts getUserId().  this.userId = ', this.userId );
    return {
      userId: authInfo.userId,
      username: authInfo.username
    };

  }

  getUserName() {
    // return this.usernameListener.asObservable();
    return this.username;
  }

  getAuthInfo() {
    const authInfo = this.getAuthData();
    // console.log('auth.s.ts getAuthInfo(). authInfo = ', authInfo );
    return authInfo;
  }

  getIsAuth() {
    // console.log('auth.s.ts getIsAuth().  this.isAuthenticated = ', this.isAuthenticated );
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // ---------------------------------------------------
  //  CREATE USER IN DATABASE
  createUser(username: string, email: string, password: string) {

    const userData: UserData = {username: username, email: email, password: password};
    // console.log('200 a.s.tx createUser.  userData = ', userData);

    return this.http
    .post(BACKEND_URL + '/signup', userData)

      .subscribe(response => {
        // console.log('204 response = ', response);
        this.router.navigate(['/dashboard']);
      }, error => {
        // console.log('205 error = ', error );
        this.authStatusListener.next(false);
      });
  }

  // ---------------------------------------------------
  //  LOG USER INTO APP
  login(username: string, email: string, password: string) {

    const authData: AuthData = {email: email, password: password};
    // console.log('authData = ', authData );

    this.http.post<{token: string, expiresIn: number, userId: string }>(BACKEND_URL + '/login', authData)

      .subscribe(response => {
        const token = response.token;

        // console.log('token = ', token );

        this.token = token;

        if (token) {

          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);

          this.isAuthenticated = true;
          this.userId = response.userId;
          this.usernameListener.next(username);
          this.authStatusListener.next(true);

          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.clearAuthData();
          this.saveAuthData(token, expirationDate, this.userId, username);

          const auth = this.getAuthData();
          // console.log('login - getAuthData(). authData = ', auth );

          this.router.navigate(['/dashboard']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }



  // ---------------------------------------------------
  //  METHOD TO AUTHENTICATE USER DURING SITE VISIT

  autoAuthUser() {
    const authInformation = this.getAuthData();
    // console.log('autoAuthUser() getAuthData().  authInformation = ', authInformation );
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    // console.log('expiresIn = ', expiresIn );
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }

  }

  // ---------------------------------------------------
  //  LOG USER OUT OF APP
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;

    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    // console.log('auth.s.ts logout().');
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
    // console.log('this.tokenTimer = ', this.tokenTimer );
  }

  // ---------------------------------------------------
  //  SAVE, REMOVE AND RETRIEVE COOKIE TOKEN IN LOCAL STORAGE
  private saveAuthData(token: string, expirationDate: Date, userId: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId );
    localStorage.setItem('username', username );
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      username: username
    };

  }

}
