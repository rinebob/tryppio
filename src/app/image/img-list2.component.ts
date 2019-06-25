import { MatTableDataSource, PageEvent, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';

import { Image } from '../images/image.model';
import { ImagesService } from '../images/images.service';


import { AuthService } from '../auth/signup/auth.service';



@Component({
  selector: 'app-img-list2',
  templateUrl: 'img-list2.component.html',
  styleUrls: ['img-list2.component.css'],
})
export class ImgList2Component implements OnInit, OnDestroy {

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

  displayedColumns = ['image', 'creator', 'title', 'description', 'lat', 'lng'];
  dataSource = new MatTableDataSource<Image>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public imagesService: ImagesService, private authService: AuthService) {

  }

  ngOnInit() {
    this.isLoading = true;

    // retrieves authentication info for current session from authService - token, exp date, userId, username
    this.authInfo = this.authService.getAuthInfo();
    // console.log('this.authInfo.userId = ', this.authInfo.userId, ' authInfo = ', this.authInfo );
    this.userId = this.authInfo.userId;


    // this.imagesService.getImages(this.imagesPerPage, this.currentPage);

    this.imagesService.getImagesByCreatorId(this.userId, this.imagesPerPage, this.currentPage);

    this.imagesSub = this.imagesService
      .getImageUpdateListener()

      .subscribe((imageData: {images: Image[], imageCount: number}) => {
        // console.log('My imageData = ', imageData );
        // console.log('image update listener isAuthenticated = ', this.userIsAuthenticated, ' UserId = ', this.userId );
        this.isLoading = false;
        this.totalImages = imageData.imageCount;
        this.images = imageData.images;
        this.dataSource = new MatTableDataSource(this.images);
        this.dataSource.sort = this.sort;
      });

    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    // retrieves authentication status for current session from authService
    this.userIsAuthenticated = this.authService.getIsAuth();


    // listener for changes in authorization status
    this.authStatusSub = this.authService
      .getAuthStatusListener()

      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
