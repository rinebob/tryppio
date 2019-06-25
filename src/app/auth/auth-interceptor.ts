import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './signup/auth.service';

// intercepts outgoing http requests and manipulates them (to add a token for instance)

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  // intercept method required by HttpInterceptor interface
  // this will intercept all outgoing requests and attach the authorization token (jwt)
  // req = outgoing request that is intercepted.  next = allows flow to leave interceptor and continue through code
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // gets token using authService
    const authToken = this.authService.getToken();
    // console.log('this.authService.getToken(). authToken = ', authToken );

    // must clone cuz if orig request is changed it will cause side effects
    const authRequest = req.clone({

      // adds auth token to request header
      // set method adds /overwrites header with provided key-value.  doesn't change any other k-v pairs.
      // this header is received in the check-auth.js jwt.verify function.  'Bearer' is a convention used to package
      // the token for recognition in the check-auth function
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    // console.log('authRequest = ', authRequest );

    // allows contiuation of request flow
    // authRequest = modified request
    return next.handle(authRequest);
  }
}

// this class is provided as a service to app.module.ts providers[] for injection in other components
