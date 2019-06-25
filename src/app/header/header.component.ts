import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/signup/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  private usernameListenerSubs: Subscription;
  username: string;
  authData: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // console.log('h.c.ts onInit start');

    this.userIsAuthenticated = this.authService.isAuthenticated;
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      // console.log('h.c.ts onInit isAuthenticated = ', isAuthenticated );
      this.userIsAuthenticated = isAuthenticated;
    });


  }

  getUser() {
    return localStorage.getItem('username');
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {

  }

}
