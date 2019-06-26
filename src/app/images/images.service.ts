import { UserData } from '../auth/user-data.model';
import { Image } from './image.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/images/';
// environment.apiUrl: 'http://localhost:3000/api'

@Injectable({
  providedIn: 'root'
})

export class ImagesService {
  private images: Image[] = [];
  private numImages: number;
  private imagesUpdated = new Subject<{images: Image[], imageCount: number}>();
  private allImagesUpdated = new Subject<{images: Image[]}>();
  private countUpdated = new Subject<{numImages: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  // ---------------------------------------------------
  //  GET ALL IMAGES - WITH PAGINATION

  getImages(imagesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${imagesPerPage}&page=${currentPage}`;

    // console.log('280 image.s.ts getImages queryParams = ', queryParams );

    this.http

    .get<{message: string, images: Image[], maxImages: number}>(BACKEND_URL + queryParams)

    .subscribe(imageData => {
      this.images = imageData.images;
      this.imagesUpdated.next({images: [...this.images], imageCount: imageData.maxImages});

    });

  }

   // ---------------------------------------------------
  //  GET ALL IMAGES - NO PAGINATION

  getAllImages() {


    // console.log('270 image.s.ts getAllImages ' );

    this.http

    .get<{message: string, images: Image[]}>(BACKEND_URL + 'all')

    .subscribe(imageData => {
    // console.log('272 image.s.ts getAllImages. imageData = ', imageData );
      this.images = imageData.images;
      this.allImagesUpdated.next({images: [...this.images]});

    });

  }

  // ---------------------------------------------------
  //  GET ALL IMAGES BY CREATOR

  getImagesByCreatorId(creatorId: string, imagesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${imagesPerPage}&page=${currentPage}`;
    const URL = BACKEND_URL + 'creator/' + creatorId;

    // console.log('290 image.s.ts getImagesByCreatorId queryParams = ', queryParams, ' URL = ', URL );

    this.http

    // .get<{message: string, images: Image[], maxImages: number}>(BACKEND_URL + queryParams)
    // .get<{message: string, images: Image[], maxImages: number}>(BACKEND_URL + creator, queryParams)
    .get<{message: string, images: Image[], maxImages: number}>(URL + queryParams)

    .subscribe(imageData => {
      this.images = imageData.images;
      // console.log('296 image.s.ts getImagesByCreatorId this.images = ', this.images );
      this.imagesUpdated.next({images: [...this.images], imageCount: imageData.maxImages});

    });

  }
  // ---------------------------------------------------
  //  GET ALL IMAGES BY CREATOR

  getImagesCountByCreatorId(creatorId: string) {
    const URL = BACKEND_URL + 'count/' + creatorId;

    // console.log('310 image.s.ts getImagesByCreatorId.  URL = ', URL );

    this.http

    // .get<{message: string, images: Image[], maxImages: number}>(BACKEND_URL + queryParams)
    // .get<{message: string, images: Image[], maxImages: number}>(BACKEND_URL + creator, queryParams)
    .get<{message: string, numImages: number}>(URL)

    .subscribe(imageInfo => {
      this.numImages = imageInfo.numImages;
      // console.log('312 image.s.ts getImagesByCreatorId this.numImages = ', this.numImages );
      this.countUpdated.next({numImages: imageInfo.numImages});

    });

  }

    // ---------------------------------------------------
  //  LISTEN FOR NEW imageS
  getAllImagesUpdateListener() {
    return this.allImagesUpdated.asObservable();
  }

  // ---------------------------------------------------
  //  LISTEN FOR NEW imageS
  getImageUpdateListener() {
    return this.imagesUpdated.asObservable();
  }

  // ---------------------------------------------------
  //  LISTENER FOR UPDATED IMAGE COUNT
  getCountUpdateListener() {
    return this.countUpdated.asObservable();
  }

  // ---------------------------------------------------
  //  GET ONE image

  getImage(_id: string) {
    // console.log('320 i.s.ts getImage. _id = ', _id );
    return this.http
    // tslint:disable-next-line:max-line-length
    // .get<{ _id: string, title: string, description: string, imagePath: string, creator: string, filnm: string, address1: string, address2: string, city: string, state: string, postcode: string, country: string, lat: number, lng: number
    .get<{ _id: string, title: string, description: string, imagePath: string, creator: string, creatorId: string, lat: number, lng: number

     }>(BACKEND_URL + _id);
  }

  getImageCreator(creator: string) {
  return this.http
    .get<{ _id: string, username: string, email: string, password: string

      }>(BACKEND_URL + creator );
  }

  // ---------------------------------------------------
  //  CREATE image IN DATABASE
  // tslint:disable-next-line:max-line-length
  // addImage(title: string, description: string, image: File, address1: string, address2: string, city: string, state: string, postcode: string, country: string, lat: number, lng: number) {
  addImage(title: string, description: string, image: File, lat: number, lng: number) {

    // console.log('300 image.s.ts title, desc, image = ', title, description, image, lat, lng );

    const imageData = new FormData();

    imageData.append('title', title);
    imageData.append('description', description);
    imageData.append('image', image, title);

    imageData.append('creator', localStorage.getItem('username'));
    imageData.append('creatorId', localStorage.getItem('userId'));

    // imageData.append('address1', address1);
    // imageData.append('address2', address2);
    // imageData.append('city', city);
    // imageData.append('state', state);
    // imageData.append('postcode', postcode);
    // imageData.append('country', country);
    imageData.append('lat', lat);
    imageData.append('lng', lng);

    // console.log('302 image.s.ts addImage(). imageData = ', imageData );
    // console.log('303 image.s.ts addImage(). imageData.image = ', imageData['image'] );
    this.http

    .post<{message: string, image: Image}>(BACKEND_URL, imageData)

    .subscribe((responseData) => {

      // console.log('306 image.s.ts addImage(). responseData = ', responseData );
      this.router.navigate(['/dashboard']);

    });
  }


  // ---------------------------------------------------
  //  UPDATE image IN DATABASE

  // tslint:disable-next-line:max-line-length
  updateImage(_id: string, title: string, description: string, image: File | string, creator: string, creatorId: string, lat: number, lng: number) {
    let imageData: Image | FormData;

    // tslint:disable-next-line:max-line-length
    // console.log('310 image.s.ts updateImage(). input: _id = ', _id, ' title = ', title, ' desc = ', description, ' creator = ', creator, ' creatorId = ', creatorId, ' img = ', image, 'lat = ', lat, ' long = ', lng );

    if (typeof(image) === 'object') {

      imageData = new FormData();
      imageData.append('_id', _id);
      imageData.append('title', title);
      imageData.append('description', description);
      imageData.append('image', image, title);
      imageData.append('creator', creator);
      imageData.append('creatorId', creatorId);
      // imageData.append('address1', address1);
      // imageData.append('address2', address2);
      // imageData.append('city', city);
      // imageData.append('state', state);
      // imageData.append('postcode', postcode);
      // imageData.append('country', country);
      imageData.append('lat', lat);
      imageData.append('lng', lng);

    } else {

      imageData = {

        _id: _id,
        title: title,
        description: description,
        imagePath: image,
        creator: creator,
        creatorId: creatorId,
        // address1: imageData.address1,
        // address2: imageData.address2,
        // city: imageData.city,
        // state: imageData.state,
        // postcode: imageData.postcode,
        // country: imageData.country,
        lat: lat,
        lng: lng

      };
      // console.log('316 image.s.ts updateImage(). typeof(image) != object. imageData = ', imageData);
    }

    this.http

    .put(BACKEND_URL + _id, imageData)

    .subscribe(response => {

      // console.log('320 image.s.ts updateImage(). put response = ', response);
      this.router.navigate(['/images']);

    });
  }

  // ---------------------------------------------------
  //  DELETE image FROM DATABASE

  deleteImage(imageId: string) {

    return this.http

      .delete(BACKEND_URL + imageId);

  }

}
