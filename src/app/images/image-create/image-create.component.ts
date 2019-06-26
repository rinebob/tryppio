import { AuthService } from '../../auth/signup/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { NgForm } from '@angular/forms';
import { ImagesService } from '../images.service';
import { Image } from '../image.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-create',
  templateUrl: './image-create.component.html',
  styleUrls: ['./image-create.component.css']
})
export class ImageCreateComponent implements OnInit, OnDestroy {
  enteredTitle: any;
  entereddescription: any;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  mode = 'create';
  private imageId: string;
  private creator: string;
  public image: Image;
  private authStatusSub: Subscription;

  constructor(public imagesService: ImagesService, public route: ActivatedRoute, private authService: AuthService) { }

  // ---------------------------------------------------
  //  INITIALIZE AS CREATE image OR EDIT image

    ngOnInit() {

    // AUTHORIZATION STATUS LISTENER

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

    // CREATE DATA ENTRY FORM IN COMPONENT
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'description': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]}),
      // 'address1': new FormControl(null),
      // 'address2': new FormControl(null),
      // 'city': new FormControl(null),
      // 'state': new FormControl(null),
      // 'postcode': new FormControl(null),
      // 'country': new FormControl(null),
      'lat': new FormControl(null),
      'lng': new FormControl(null)
    });

    // CHECK FOR image ID IN ROUTE PARAMS
    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      // IF image ID EXISTS:
      // SET COMPONENT TO EDIT MODE
      if (paramMap.has('imageId')) {

        this.mode = 'edit';
        this.imageId = paramMap.get('imageId');
        this.isLoading = true;

        console.log('220 i-c.c.ts ngOnInit paramMap has ImageId. imageId = ', this.imageId );
        // console.log('221 i-c.c.ts ngOnInit paramMap = ', this.route.paramMap );

      // QUERY DB FOR image
        this.imagesService.getImage(this.imageId)

          .subscribe(imageData => {

            this.isLoading = false;

            console.log('222 i-c.c.ts ngOnInit imageData = ', imageData );

          // CREATE image OBJECT TO DISPLAY IN FORM
            this.image = {
              _id: imageData._id,
              title: imageData.title,
              description: imageData.description,
              imagePath: imageData.imagePath,
              creator: imageData.creator,
              creatorId: imageData.creatorId,
              // address1: imageData.address1,
              // address2: imageData.address2,
              // city: imageData.city,
              // state: imageData.state,
              // postcode: imageData.postcode,
              // country: imageData.country,
              lat: imageData.lat,
              lng: imageData.lng
            };

          // DISPLAY image OBJECT IN FORM
            this.form.setValue({
              title: this.image.title,
              description: this.image.description,
              image: this.image.imagePath,
              // address1: imageData.address1,
              // address2: imageData.address2,
              // city: imageData.city,
              // state: imageData.state,
              // postcode: imageData.postcode,
              // country: imageData.country,
              lat: imageData.lat,
              lng: imageData.lng,
            });

          });

      // IF image ID DOES NOT EXIST:
      // SET COMPONENT TO CREATE MODE
      } else {
        this.mode = 'create';
        this.imageId = null;
      }
    });
 }

   // ---------------------------------------------------
   // USER SELECTS AN IMAGE FROM FILE PICKER

  onImagePicked(event: Event) {

    const file = (event.target as HTMLInputElement).files[0];

    console.log('230 i-c.c.ts onImagePicked. event = ', event );

    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  // ---------------------------------------------------
  //  USER CLICKS TO SAVE CREATED / EDITED image
  onSaveImage() {

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    if (this.mode === 'create') {
      // tslint:disable-next-line:max-line-length
      // console.log('240 i-c.c.ts onSaveImage(). mode = create.  form data = ', this.form.value.title, this.form.value.description, this.form.value.image, this.form.value.lat, this.form.value.lng );

      // tslint:disable-next-line:max-line-length
      this.imagesService.addImage(this.form.value.title, this.form.value.description, this.form.value.image, this.form.value.lat, this.form.value.lng);

      // tslint:disable-next-line:max-line-length
      console.log('242 i-c.c.ts onSaveImage addImage.  this.form.value.image = ', this.form.value.image )

    } else {

      // tslint:disable-next-line:max-line-length
      // console.log('242 i-c.c.ts onSaveImage() edit image. data = ', this.form.value.title, this.form.value.description, this.form.value.lat, this.form.value.lng );
      // console.log('243 i-c.c.ts onSaveImage(). this.image.creator = ', this.image.creator );

      // tslint:disable-next-line:max-line-length
      this.imagesService.updateImage(

        this.imageId,
        this.form.value.title,
        this.form.value.description,
        this.form.value.image,
        this.image.creator,
        this.image.creatorId,
        // this.form.value.address1,
        // this.form.value.address2,
        // this.form.value.city,
        // this.form.value.state,
        // this.form.value.postcode,
        // this.form.value.country,
        this.form.value.lat,
        this.form.value.lng
      );
    }

    this.form.reset();
  }




  ngOnDestroy() {

    this.authStatusSub.unsubscribe();
  }



}
