import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

import { Image } from '../images/image.model';
import { ImagesService } from '../images/images.service';

import { AuthService } from '../auth/signup/auth.service';


@Component({
  selector: 'app-img-list',
  templateUrl: 'img-list.component.html',
  styleUrls: ['img-list.component.css'],
})
export class ImgListComponent {

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


  constructor(public imagesService: ImagesService, private authService: AuthService) {}

  ngOnInit() {
    this.isLoading = true;
    this.imagesService.getImages(this.imagesPerPage, this.currentPage);

    this.imagesSub = this.imagesService
      .getImageUpdateListener()

      .subscribe((imageData: {images: Image[], imageCount: number}) => {
        // console.log('My imageData = ', imageData );
        // console.log('image update listener isAuthenticated = ', this.userIsAuthenticated, ' UserId = ', this.userId );
        this.isLoading = false;
        this.totalImages = imageData.imageCount;
        this.images = imageData.images;
      });

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

  getUser() {
    return localStorage.getItem('username');
  }

  onDelete(imageId: string) {
    this.isLoading = true;
    this.imagesService.deleteImage(imageId)
      .subscribe(() => {

        this.imagesService.getImages(this.imagesPerPage, this.currentPage);

      }, () => {
        this.isLoading = false;

      });

  }

   onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.imagesPerPage = pageData.pageSize;
    this.imagesService.getImages(this.imagesPerPage, this.currentPage);
  }



   ngOnDestroy() {
    this.imagesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
