import {Component, OnInit, OnDestroy } from '@angular/core';
import { ImagesService } from '../images/images.service';
import { AuthService } from '../auth/signup/auth.service';
import { Image } from '../images/image.model';

import {Observable} from 'rxjs/Observable';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userId: string;
  images: Image[] = [];
  authInfo: any;
  isLoading = false;
  totalImages = 0;
  imagesPerPage = 5;
  pageSizeOptions = [1, 2, 5, 10, 25, 50, 100];
  currentPage = 1;

  userIsAuthenticated = false;
  private imagesSub: Subscription;
  private authStatusSub: Subscription;
  private usernameListenerSubs: Subscription;
  username: string;

  constructor(private imagesService: ImagesService, private authService: AuthService ) {
  }

  ngOnInit() {
    // console.log('dash.c.ts ngOnInit');


    this.username = this.authService.getUserInfo().username;
    // console.log('dash.c.ts this.username = ', this.username );

    // this.usernameListenerSubs = this.authService.getUserName().subscribe( username => {
    //   this.username = username;
    //   console.log('i-l.c.ts onInit username = ', username, ' this.username = ', this.username );
    // });

      // retrieves authentication status for current session from authService
      this.userIsAuthenticated = this.authService.getIsAuth();

      // retrieves authentication info for current session from authService - token, exp date, userId, username
      this.authInfo = this.authService.getAuthInfo();
      // console.log('this.authInfo.userId = ', this.authInfo.userId, ' authInfo = ', this.authInfo );
      this.userId = this.authInfo.userId;

      // listener for changes in authorization status
      this.authStatusSub = this.authService
      .getAuthStatusListener()

      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    // console.log('dash.c.ts ngOnDestroy');
  }
}

