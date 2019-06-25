import { MatTableDataSource, PageEvent, MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';

import { Image } from '../image.model';
import { ImagesService } from '../images.service';


import { AuthService } from '../../auth/signup/auth.service';



@Component({
  selector: 'app-img-list2',
  templateUrl: 'image-list.component.html',
  styleUrls: ['image-list.component.css'],
})
export class ImageListComponent implements OnInit, OnDestroy {

  userId: string;
  images: Image[] = [];
  authInfo: any;
  isLoading = false;
  totalImages: any;
  imagesPerPage = 5;
  pageSizeOptions = [1, 2, 5, 10, 25, 50, 100];
  currentPage = 1;

  userIsAuthenticated = false;
  private imagesSub: Subscription;
  private countSub: Subscription;
  private authStatusSub: Subscription;

  displayedColumns = ['image', 'creator', 'title', 'description', 'lat', 'lng', 'edit', 'delete'];
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

    this.imagesService.getImagesCountByCreatorId(this.userId);
    this.countSub = this.imagesService
      .getCountUpdateListener()

      .subscribe((countData: {numImages: number}) => {
        //  console.log('200 i-l.c.ts My countData = ', countData );

        this.totalImages = countData.numImages;
        // console.log('202 i-l.c.ts this.totalImages = ', this.totalImages );

      });

    this.imagesService.getImagesByCreatorId(this.userId, this.imagesPerPage, this.currentPage);

    this.imagesSub = this.imagesService
      .getImageUpdateListener()

      .subscribe((imageData: {images: Image[], imageCount: number}) => {
        // console.log('210 i-l.c.ts My imageData = ', imageData );
        // console.log('212 i-l.c.ts image update listener isAuthenticated = ', this.userIsAuthenticated, ' UserId = ', this.userId );
        this.isLoading = false;
        this.images = imageData.images;
        // console.log('214 i-l.c.ts this.images = ', this.images );
        this.dataSource = new MatTableDataSource(this.images);
        console.log('216 i-l.c.ts this.dataSource = ', this.dataSource );
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

        this.ngOnInit();

      }, () => {
        this.isLoading = false;

      });

  }

   onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.imagesPerPage = pageData.pageSize;
    this.imagesService.getImagesByCreatorId(this.userId, this.imagesPerPage, this.currentPage);
  }
   ngOnDestroy() {
    this.imagesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
