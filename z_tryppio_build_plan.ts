import { map } from 'rxjs/operators';
// ====================================================
// Bob Rinehart
// TRYPPIO.COM
// Build plan
// July 8, 2019
// ====================================================

// TABLE OF CONTENTS:
// APP DESCRIPTION / USE CASES
// USER TYPES
// PROJECT STATUS / EXISTING MODULES
// NEW MODULES / FUNCTIONALITY

// BUILD STEPS

// PROJECT CREATION
// APP.MODULE
// CLICKABLE PROTOTYPE
// UPLOAD IMAGE
// VIEW IMAGE
// EDIT IMAGE METADATA
// LOCATE IMAGE ON MAP

// ====================================================
// EXISTING COMPONENTS / MODULES - TRYPPIO FULL
// ====================================================
// This project was started using Max's Angular/Node course project as a template.
// Existing Modules

// Existing components
// src
//   app
//     auth
//       login
//       signup
//     dashboard
//     error
//     grid
//     header
//     images
//       image-create
//       image-list
//     main-map
//     profile*
//     story*
//     z_sandbox

// star = created only - no functionality

// ====================================================
// ====================================================
// ====================================================
// EXISTING FUNCTIONALITY
// ====================================================
// ====================================================
// ====================================================


// ====================================================
// AUTH MODULE - SIGNUP / LOGIN
// ====================================================
// FILES:
// auth-data.model.ts
// user-data.model.ts
// auth-routing.module.ts
// auth-interceptor.ts - intercepts outgoing http requests and manipulates them (to add a token for instance)
// auth.guard.ts - checks whether user is authorized and if not, redirects to /login
// auth.module.ts

// SIGNUP COMPONENT
// creates user in auth service

// LOGIN COMPONENT
// takes username, email and password
// checks auth status in service

// AUTH SERVICE
// retrieve functions:
// getToken()
// getUserInfo()
// getUserName()
// getAuthInfo()
// getIsAuth()
// getAuthStatusListener()

// login functions:
// createUser()
// login()
// autoAuthUser()
// logout()

// cookie management functions:
// saveAuthData()
// clearAuthData()
// getAuthData()

// redirects to /dashboard upon successful login

// ====================================================
// DASHBOARD
// ====================================================
// html contains:
// menu bar with My Profile, My Images, Upload Image and My Stories links
// commented out duplicate menu bar and  grid of images

// logic contains:
// OnInit auth check only.  no image display functionality

// ====================================================
// GRID MODULE
// ====================================================
// html contains unfinished(?) card layouts


// ====================================================
// HEADER
// ====================================================
// html contains mat-toolbar with ul / li / a tags
// and commented out menu from https://auth0.com/blog/creating-beautiful-apps-with-angular-material/
// menu items: Main Map, Dashboard, Log Out / Log In, Sign Up
// css file has contents
// controller functions:
// getUser()
// onLogout()

// ====================================================
// IMAGE COMPONENT - looks like dupe of image list component below but with a little less functionality
// ====================================================
// contains img-list and img-list2 components.  imglist2 looks more complete
// img-list2:
// html contains table of images with pagination.  css file has contents
// controller functions:
// applyFilter()
// getUser()
// onDelete() - for image delete
// onChangedPage()


// ====================================================
// IMAGES COMPONENT
//  Image create
//  Image list
// ====================================================
// image.model.ts
// images.module.ts
// images.service.ts functions:
// getImages()
// getAllImages()
// getAllImagesByCreatorId()
// getImagesCountByCreatorId()
// getAllImagesUpdateListener()
// getImageUpdateListener()
// getCountUpdateListener()
// getTreeMissingMatchingNodeDefError()
// getImageCreator()
// addImage()
// updateImage()
// deleteImage()

// IMAGE CREATE COMPONENT
// contains mime-type validator
// html contains mat card with input form.  css file has contents
// controller:
// OnInit creates form and populates with image (if edit mode) or blank form (if create mode)
// onImagePicked()
// onSaveImage()

// IMAGE LIST COMPONENT
// html contains table of images with edit and delete icons and pagination (more extensive than img2-list above)
// css file has contents
// controller functions:
// same as above.  ngOnInit adds get image count by user function call
// applyFilter()
// getUser()
// onDelete() - for image delete
// onChangedPage()






// ====================================================
// MAIN MAP COMPONENT
// ====================================================
// html has agm-map and agm-marker, agm-snazzy-info-window and ng-template tags to create a map with markers and popup cards
// css has lots of classes copied from snazzy info window

// controller:
// lots of @Input variables and @Output EventEmitters
// functions:
// createMarkers()
// mapClicked()
// markerDragEnd()
// markerClicked()
// onChoseLocation()
// also contains Marker Interface definition



// ====================================================
// ====================================================
// ====================================================
//        STORY BOARDS - MVP ONLY
// ====================================================
// ====================================================
// ====================================================

/*
user navigates to URL www.tryppio.com
----------------
user is presented with:
----------------
MENU BAR COMPONENT at top of screen
GOOGLE MAP COMPONENT in main area
IMAGE LIST COMPONENT in right sidebar

MENU BAR COMPONENT options:
Upload - opens image picker.  when image(s) selected, navigate to VIEW IMAGE COMPONENT
View - navigate to VIEW IMAGE COMPONENT
Edit - navigate to EDIT IMAGE COMPONENT
Locate - navigate to LOCATE IMAGE COMPONENT

GOOGLE MAP COMPONENT in main area:
centered on location:
showing image icons at correct location for each image

IMAGE LIST COMPONENT in right sidebar:
displays collection of images as prepared by ngOnInit or user interaction with filter
collection consists of vertical list of material cards, one card per image with subset of associated data

----------------
possible user actions:
----------------
click on MENU option:

UPLOAD
VIEW
EDIT
LOCATE

- manipulate GOOGLE MAP display using map controls
zoom in/out
change map type
pan
etc.

- hover over icon to view IMAGE CARD COMPONENT
- click on icon to open IMAGE CARD COMPONENT

- use filter field to limit displayed images
- hover over image list record to animate corresponding map marker
- click on image in list to pop open corresponding image card in map

TASKS
x Create project
x create menu bar component
x create main-map component shell
create google map child-component shell
create image list child-component shell
create view-main component shell
create edit image child-comonent shell
create locate image child-component shell

Create clickable prototype
enable navigation via menu bar
	- open image picker then view-main component
	- open view-main image component
	- open edit child-component
	- open locate child-component

PROJECT APP DIRECTORY/COMPONENT STRUCTURE
src
	app
		image-main component
			map child component
			edit child component
			locate child component
		view-main component
			image view component
			image thumb component




*/

// ====================================================
// commands to create project using angular cli:
// ====================================================
ng new tryppio-mvp --routing

// NOTE: 7-9-19 TUES
// SWITCHING DEVELOPMENT TO TRYPPIO-MVP PROJECT TO BUILD FROM SCRATCH

// ====================================================
// commands to generate components using angular cli:
// ====================================================
// (wouldn't work without skip import option)
ng g c map-main --skip-import
ng g c view-main --skip-import
ng g c map-main/map --skip-import
ng g c map-main/edit-image --skip-import
ng g c map-main/locate-image --skip-import
ng g c view-main/view-image --skip-import
ng g c view-main/view-thumbs --skip-import

// ====================================================
// index.html
// ====================================================
// add code to index.html

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Tryppio</title>
	<base href="/">

	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="Tryppio - Social Network for Travelers">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" type="image/x-icon" href="favicon.ico">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" >
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<link href="assets/styles.css" rel="stylesheet" />
</head>
<body>

	<main class="container">
		<app-root>
			Loading...
		</app-root>
		<br /><br />
	</main>


<script src="https://localhost:3000/node_modules/snazzy-info-window/dist/snazzy-info-window.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em" crossorigin="anonymous"></script>
</body>
</html>

// ====================================================
// app.component.html
// ====================================================
// add tags for header component and router-outlet

<app-header></app-header>
<main>
	<router-outlet></router-outlet>
</main>

// ====================================================
// app.module.ts
// ====================================================
// register new components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MapMainComponent } from './map-main/map-main.component';
import { MapComponent } from './map-main/map/map.component';
import { EditImageComponent } from './map-main/edit-image/edit-image.component';
import { LocateImageComponent } from './map-main/locate-image/locate-image.component';
import { ViewImageComponent } from './view-main/view-image/view-image.component';
import { ViewThumbsComponent } from './view-main/view-thumbs/view-thumbs.component';

@NgModule({
	declarations: [
		AppComponent,
		MapMainComponent,
		MapComponent,
		EditImageComponent,
		LocateImageComponent,
		ViewImageComponent,
		ViewThumbsComponent
	],
	imports: [
		BrowserModule,

	],
	bootstrap: [ AppComponent ]

})

export class AppModule { }


// ====================================================
// ====================================================
// ====================================================
// ====================================================
// ====================================================
// ====================================================


// ====================================================
// PHASE ONE - CLICKABLE PROTOTYPE
// ====================================================



// Angular component selector HTML tag hierarchy
//(revised 7-16 to include image-item as component in image-list)
// also, will now have separate components for each image feature

// index.html - app-root
// app.component.html
//     app-header
//     router-outlet

// router-outlet
//     map-main
//     view-main
//     image-edit
//     image-locate
//     image-upload

// map-main
//     map
//     image-list

// view-main
//     image-view
//     image-thumbs

// edit-main
//    image-edit
//    image-list

// locate-main
//    image-locate
//    image-list

// upload-main
//    launches file picker
//    once files selected loads view-main


// ====================================================
// index.html
// ====================================================
// add necessary scripts links etc
// insert app-root

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Tryppio - MVP</title>
	<base href="/">

	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="Tryppio - Social Network for Travelers">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="icon" type="image/x-icon" href="favicon.ico">
	<!-- <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" > -->
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <!-- <link href="node_modules/@angular/material/prebuilt-themes/indigo-pink.css" rel="stylesheet"> -->
  <!-- <link type="text/css" href="node_modules/@angular/material/prebuilt-themes/indigo-pink.css"> -->
	<!-- <link type="text/css" href="styles.css" rel="stylesheet" /> -->
  <link type="text/css" href="styles.css"/>
  <!-- removing rel="stylesheet" gets rid of the mime-type checking error in chrome browser console -->
</head>
<body>

	<main class="container">
		<app-root>
			Loading...
		</app-root>

	</main>


<!-- <script src="https://localhost:3000/node_modules/snazzy-info-window/dist/snazzy-info-window.min.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js" integrity="sha384-o+RDsa0aLu++PJvFqy8fFScvbHFLtbvScb8AjopnFD+iEQ7wo/CG0xlczd+2O/em" crossorigin="anonymous"></script>
</body>
</html>


// ====================================================
// app component
// ====================================================
// app.component.html
// insert app-header tag
// insert router-outlet tag

<app-header></app-header>
<router-outlet></router-outlet>

// ====================================================
// header component
// ====================================================
<mat-toolbar color="primary">
  <span>
    <a>Tryppio</a>
  </span>
  <span class="spacer"></span>
  <ul>
    <li>
      <a mat-button>Main Map</a>
    </li>
    <li>
      <a mat-button>Upload</a>
    </li>
    <li>
      <a mat-button>View</a>
    </li>
    <li>
      <a mat-button>Edit</a>
    </li>
    <li>
      <a mat-button>Locate</a>
    </li>
  </ul>
</mat-toolbar>



// Another Navigation Bar (not used)
// header.comonent.html
// Collapsable menu bar with hamburger icon
// note: i installed bootstrap but this menu doesn't work...

<nav class="navbar navbar-default">
	<div class="container-fluid">

		<div class="navbar-header">
			<button type="button" class="navbar-toggle" (click)="collapsed = !collapsed">
				<span class="icon-bar" *ngFor="let iconBar of [1, 2, 3]"></span>
  			</button>
  			<a routerLink="/" class="navbar-brand">Recipe Book</a>
			</div>
			<div class="navbar-collapse" [class.collapse]="collapsed" (window:resize)="collapsed = true">

			<ul class="nav navbar-nav">
				<li><a href="#">Recipes</a></li>
				<li><a href="#">Shopping List</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" role="button">Manage <span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li><a href="#">Save Data</a></li>
						<li><a href="#">Fetch Data</a></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</nav>



},  // fixes below colors

// ====================================================
// map-main component
// ====================================================
// create map-main component
ng g c map-main

// app-routing - add route to routes array
{ path: 'map-main', component: MapMainComponent },

// header.html
// add routerLink directives for menu bar navigation
<a routerLink="/">Tryppio</a>
<a mat-button routerLink="/map-main">Main Map</a>

// create map child component
ng g c map-main/map

// map-main.component.html
// Create Map-Main Component Shell
// add app-map selector in left side
// add image-list selector in right side

<div class="container" fxLayout="row" height="100%" width="100%">
  <div class="content" fxFlex="70%">
    <div fxFlex="100%">
      <app-map></app-map>
    </div>
  </div>
  <div class="side" fxFlex="30%">
    <div fxFlex="100%">
      <app-image-list></app-image-list>
    </div>
  </div>
</div>

// map-main.component.css
.container {
  display: grid;
  grid-template-areas: "content side";
  grid-template-rows: auto;
}

div {
  border: 1px solid black;
  margin: 0;
  padding: 0;
}

.content {
  min-height: 95vh;
}

.side {
  min-height: 95vh;
}




// ====================================================
// edit-main component
// ====================================================
// create edit-main comonent
ng g c edit-main

// app-routing - add route to routes array
{ path: 'edit-images', component: EditMainComponent },

// header.html
// add routerLink directive for menu bar navigation
<a mat-button routerLink="/edit-images">Edit</a>

// create image-edit child component
ng g c edit-main/image-edit

// edit-main.component.html
// Create Edit-Main Component Shell
// add app-image-edit selector in left side
// add image-list selector in right side

<div class="container" fxLayout="row" height="100%" width="100%">
    <div class="content" fxFlex="70%">
      <div fxFlex="100%">
        <app-image-edit></app-image-edit>
      </div>
    </div>
    <div class="side" fxFlex="30%">
      <div fxFlex="100%">
        <app-image-list></app-image-list>
      </div>
    </div>
  </div>

// edit-main.comonent.css
.container {
  display: grid;
  grid-template-areas: "content side";
  grid-template-rows: auto;
}

div {
  border: 1px solid black;
  margin: 0;
  padding: 0;
}

.content {
  min-height: 90vh;
}

.side {
  /* min-height: 95vh; */
}


// ====================================================
// locate-main component
// ====================================================
// create locate-main component
ng g c locate-main

// app-routing - add route to routes array
{ path: 'locate-images', component: LocateMainComponent },

// header.html
// add routerLink directive for menu bar navigation
<a mat-button routerLink="/locate-images">Locate</a>

// create image-locate child component
ng g c locate-main/image-locate

// locate-main.component.html
// Create Locate-Main Component Shell
// add app-image-locate selector in left side
// add image-list selector in right side
<div class="container" fxLayout="row" height="100%" width="100%">
    <div class="content" fxFlex="70%">
      <div fxFlex="100%">
        <app-image-locate></app-image-locate>
      </div>
    </div>
    <div class="side" fxFlex="30%">
      <div fxFlex="100%">
        <app-image-list></app-image-list>
      </div>
    </div>
  </div>

// locate-main.comonent.css
.container {
  display: grid;
  grid-template-areas: "content side";
  grid-template-rows: auto;
}

div {
  border: 1px solid black;
  margin: 0;
  padding: 0;
}

.content {
  min-height: 90vh;
}

.side {
  /* min-height: 95vh; */
}


// ====================================================
// view-main component
// ====================================================
// create view-main component
ng g c view-main

// app-routing - add route to routes array
{ path: 'view-images', component: ViewMainComponent },

// header.html
// add routerLink directive for menu bar navigation
<a mat-button routerLink="/view-images">View</a>

// create image-view child component
ng g c view-main/image-view

// create image-thumbs child component
ng g c view-main/image-thumbs


// view-main.component.html
// Create View-Main Component Shell
// add app-image-view selector on top
// add image-thumbs selector on bottom

<div class="container" fxLayout="column">
  <!-- <div class="view" fxLayout="row" height="75%" width="100%"> -->
  <div class="view" fxLayout="row">
    <app-image-view></app-image-view>
  </div>
  <div class="thumbs" fxLayout="row">
    <app-image-thumbs></app-image-thumbs>
  </div>
</div>


// view-main.comonent.css
.container {
  display: grid;
  grid-template-areas: "view thumbs";
  grid-template-rows: auto;
  /* min-height: 100vh; */
  min-width: 100vh;
}

div {
  border: 1px solid black;
  margin: 0;
  padding: 0;
}

.view {
  grid-template: view;
  min-height: 70vh;
  min-width: 100vh;

}

.thumbs {
  grid-template: thumbs;
  /* min-height: 20vh; */
  /* min-width: 100vh; */

}


// ====================================================
// image-list child component
// ====================================================
// create image-list child component as it's own directory
ng g c image-list

// create new component image-item
ng g c image-item

// ====================================================
// FEATURE COMPONENTS
// ====================================================

// individual feature components
// map
// image-list
//    image-item
// image-edit
// image-locate
// image-view
// image-thumbs

// using angular flexbox for layout but bootstrap shells given also

// ====================================================
// map component
// ====================================================
// bootstrap
<div class="row">
  <div class="col-md-12">
  <h2>Map Component dude!</h2>

  // HTML to display a Google Map with markers for all images

  </div>
</div>

// flex layout
<div class="container" fxLayout="row" height="100%" width="100%">
  <div class="content" fxFlex="100%">
    <div fxFlex="100%">
      <h2>Map Component in flexbox dude!</h2>

      // HTML to display a Google Map with markers for all images

    </div>
  </div>
</div>



// ====================================================
// image-list
// ====================================================
// inside parent container, 100% width
// bootstrap
  <div class="row">
    <div class="col-md-12">
      <h2>Image-List Component dude!</h2>

        // div with *ngFor image of images
        // HTML to display a single image card

    </div>
  </div>

// flex layout
<div class="container" fxLayout="row" height="100%" width="100%">
  <div class="content" fxFlex="100%">
    <div fxFlex="100%">

        // div with *ngFor image of images
        // HTML to display a single image card

    </div>
  </div>
</div>




// ====================================================
// image-edit
// ====================================================
// bootstrap
<div class="row">
  <div class="col-md-12">
  <h2>Image Edit Component dude!</h2>

  // HTML to display an image with data with edit capability

  </div>
</div>

// flex layout
<div class="container" fxLayout="row" height="100%" width="100%">
  <div class="content" fxFlex="100%">
    <div fxFlex="100%">
    <h2>Image Edit Component in flexbox dude!</h2>

    // HTML to display an image with data with edit capability

    </div>
  </div>
</div>

// ====================================================
// image-locate
// ====================================================


<div class="container" fxLayout="row" height="100%" width="100%">
  <div class="content" fxFlex="100%">
    <div fxFlex="100%">
    <h2>Image Locate Component in flexbox dude!</h2>

    // HTML to display an image with data with edit capability

    </div>
  </div>
</div>

// ====================================================
// image-view
// ====================================================
// inside parent container, height = 75%
  <div class="row">
    <div class="col-md-12">
      <h2>Image-View Component dude!</h2>

      // HTML for Single Large Image Display in Lightbox

    </div>
  </div>

  // flex layout

  <div fxLayout="row" height="85%" width="100%" class="content" fxFlex="100%">
    <div fxFlex="100%">

      // HTML for Single Large Image Display in Lightbox

    </div>
  </div>



// ====================================================
// image-thumbs
// ====================================================
// inside parent container height = 15%
// bootstrap
  <div class="row">
    <div class="col-md-12">
      <h2>Image-Edit Component dude!</h2>

      // Strip of image thumbnails across bottom 15% of screen

    </div>
  </div>
// flexbox
  <div fxLayout="row" height="15%" width="100%" class="content" fxFlex="100%">
      <div fxFlex="100%">

        // Strip of image thumbnails across bottom 15% of screen

      </div>
    </div>


// ====================================================
// PHASE TWO - ADD IMAGE DATA TO APP
// ====================================================

// ====================================================
// Image Data Model
// ====================================================

// image-list.component.ts
images = [];

// create file /shared/image.model.ts

// image.model.ts
export class Image {
  public id: number
	public title: string;
	public description: string;
  public imagePath: string;
  public creator: string;
  public creatorId: string;
  public lat: string;
  public long: string;

	constructor(id: number, title: string, desc: string, imagePath: string, creator: string, creatorId: string, lat: string, long: string) {
		this.id = id;
		this.title = title;
		this.description = desc;
    this.imagePath = imagePath;
    this.creator = creator;
    this.creatorId = creatorId;
    this.lat = lat;
    this.long = long;
	}
}

// ====================================================
// Image Data
// ====================================================

// Image data hard coded in \src\assets\images.ts as json object.
// This is from https://www.udemy.com/angular-material-course/learn/lecture/8617736#overview
// Vasco udemy angular material course
// One image shown here for reference
// images.ts
import {Image} from '../app/shared/image.model';

export const IMAGES: any = {
  0: {
    id: 0,
    title: 'Image-1',
    description: 'Fancy description here',
    imagePath: 'assets/img/pexels-photo-219998.jpeg', // don't include '/src/' in the path
    creator: 'Bob',
    creatorId: 1,
    lat: '0',
    long: '0'
  },
  ...
}


// ====================================================
// Add content to image-list component
// ====================================================

// image-list.component.ts
// import the images json object
import { IMAGES } from '../../assets/images';

// declare class variable images to be the values from the json object
images = Object.values(IMAGES);

// BONUS: how to sort values in ngOnInit
// from https://www.udemy.com/angular-material-course/learn/lecture/8617736#overview
// import data model
import { Image } from '../shared/image.model';

// declare class variable(s) to hold the result of the sort
sortedImages: Image[]

// in ngOnInit, declare a const to hold the raw data values
const images = Object.values(IMAGES);

// run the sort as follows
this.sortedImages = images.filter(image => image.field === whatever)

// ex:
this.sortedImages = images.filter(image => image.category === 'beach')

// this will produce an array of images that meet the sort criteria



// note: following array not used but stored in this file

// images: Image[] = [

//   // note: missing id field
//   new Image('Image-1', 'Fancy description here', '/src/assets/img/pexels-photo-219998.jpeg', 'Bob', '1', '0', '0'),
//   new Image('Image-2', 'Nice description here',  '/src/assets/img/pexels-photo-302549.jpeg', 'Bob', '1', '0', '0'),
//   new Image('Image-3', 'Wordy description here', '/src/assets/img/pexels-photo-319893.jpeg', 'Bob', '1','0', '0'),
//   new Image('Image-4', 'Lame description here', '/src/assets/img/pexels-photo-338504.jpeg', 'Bob', '1', '0', '0'),
//   new Image('Image-5', 'Not much of a description here', '/src/assets/img/pexels-photo-416676.jpeg', 'Bob', '1', '0','0'),
//   new Image('Image-6', 'Really?', '/src/assets/img/pexels-photo-417083.jpeg', 'Bob', '1', '0',  '0'),
//   new Image('Image-7', 'Nice beach!', '/src/assets/img/pexels-photo-449627.jpeg', 'Bob', '1', '0', '0'),
//   new Image('Image-8', 'I wanna go here', '/src/assets/img/pexels-photo-753626.jpeg', 'Bob', '1', '0', '0'),
//   new Image('Image-9', 'That\'s awesome', '/src/assets/img/pexels-photo-994605.jpeg', 'Bob', '1', '0', '0'),
//   new Image('Image-1', 'ok that\'s all folks', '/src/assets/img/pexels-photo-921908.jpeg', 'Bob', '1', '0', '0'),

// ];

// ====================================================
// Output a list of images with ngFor
// ====================================================
// image-list.component.html
// contains shell and mat-card code
// later we can put the mat-card into the (already created) image-item component
// for now it works like this
// the css makes it look much better btw...

<div class="container" fxLayout="row" height="100%" width="100%">
    <div class="content" fxFlex="100%">
      <div fxFlex="100%">

          // <!-- <app-image-item *ngFor="let image of images"></app-image-item> -->

          <mat-card *ngFor="let image of images" class="image-card mat-elevation-z10">
            <mat-card-header>
              <div mat-card-avatar></div>
              <mat-card-title>{{ image.title }}</mat-card-title>
            </mat-card-header>
            <img mat-card-image [src]="image.imagePath" alt="">
            <!-- <img mat-card-image src="{{image.imagePath}}" alt=""> -->
            <mat-card-content>
            {{ image.description }}
            </mat-card-content>
            <mat-card-actions class="image-actions">
              <button mat-button class="mat-raised-button mat-primary">View</button>
              <button mat-button class="mat-raised-button mat-primary">Edit</button>
              <button mat-button class="mat-raised-button mat-primary">Delete</button>
            </mat-card-actions>
          </mat-card>

      </div>
    </div>
  </div>

// image-list.c.css
.image-card {
  margin: 20px 10px;
}

.image-actions {
  text-align: center;
}

img {
  max-width: 200px;
  margin: 0 20px;
}


// ====================================================
// Display image details
// ====================================================
// image-edit.component.html
<div class="row">
	<div class="col-xs-12">
		<img src="" alt="" class="img-responsive">
	</div>
</div>
<div class="row">
	<div class="col-xs-12">
		<h1>Image Title </h1>
	</div>
</div>
<div class="row">
	<div class="col-xs-12">
		<div class="btn-group">
			<button
			type="button"
			class="btn btn-primary dropdown-toggle">
				Manage Image <span class="caret"></span>
			</button>
			<ul class="dropdown-menu">
				<li><a href="">Upload</a></li>
				<li><a href="">Locate</a></li>
				<li><a href="">Delete</a></li>
			</ul>
		</div>
	</div>
</div>
<div class="row">
  <div class="col-xs-12">
  <p>Image Description</p>
  <p>Creator</p>
  <p>Latitude</p>
  <p>Longitude</p>

	</div>
</div>


// ====================================================
// User data model
// ====================================================
// create folder app/shared
// create file user.model.ts

// app/shared/user.model.ts
export class User {
	public firstName: string;
	public lastName: string;
	public userName: string;
	public email: string;
	public adminLevel: number;

	constructor(name: string, amount: number) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.email = email;
		this.adminLevel = adminLevel;
	}
}

// ====================================================
// Add navigation with event binding and ngIf
// ====================================================
// NOTE: this code not used.  went directly to routing so no ngIfs needed

// will need to pass selected feature into map-main component so it knows which child component to load


// in header.html, create click listeners for one method passing either 'main-map', 'upload', 'edit', 'view' or 'locate' as an argument on the appropriate buttons
(click)="onSelect('main-map')"  // map comonent
(click)="onSelect('upload')"    // map comonent + opens image picker
(click)="onSelect('view')"      // view-main component
(click)="onSelect('edit')"      // image-edit component
(click)="onSelect('locate')"     // image-locate component

// in header.ts, create status property 'featureSelected' and initialize it as a new EventEmitter<string>.  add @Output decorator also
@Output() featureSelected = new EventEmitter<string>();

// create onSelect method which receives an argument feature: string and emits featureSelected feature
onSelect(feature: string) {
	this.featureSelected.emit(feature);
}

// in app.ts, add property 'loadedFeature' and init to 'recipe'
loadedFeature = 'map-main';

// create method onNavigate which takes a feature:string and sets this.loadedFeature to feature
onNavigate(feature: string) {
	this.loadedFeature = feature;
}

// in app.html bind to feature selected property and fire onNavigate method passing the $event data.  place this in the app-header tag
(featureSelected)="onNavigate($event)"

// becomes:
<app-header (featureSelected)="onNavigate($event)"></app-header>

// use ngIf to display the correct feature by embedding directive in each component tag for recipes and shopping-list
*ngIf="loadedFeature === 'main-map'"
*ngIf="loadedFeature === 'upload'"
*ngIf="loadedFeature === 'view-main'"
*ngIf="loadedFeature === 'image-edit'"
*ngIf="loadedFeature === 'image-locate'"

// becomes:
<app-map-main *ngIf="loadedFeature === 'main-map'"></app-map-main>
<app-image-upload *ngIf="loadedFeature === 'upload'"></app-image-upload>
<app-view-main *ngIf="loadedFeature === 'view-main'"></app-view-main>
<app-image-edit *ngIf="loadedFeature === 'edit'"></app-view-image-edit>
<app-image-locate *ngIf="loadedFeature === 'locate`'"></app-image-locate>

// ====================================================
// Pass image data with property binding
// ====================================================


// separate the image-item display html into a child comonent
// image-list.html
<div class="row">
  <div class="col-xs-12">

  // insert app-image-item selector tag here and add *ngFor directive to display list of images


      <app-image-item *ngFor="let image of images"></app-image-item>

      // move this block into image-item.html
    //   <div class="pull-left">
    //     <h4 class="list-group-item-heading">{{ image.name }}</h4>
    //     <p class="list-group-item-text">{{ image.description }}</p>
    //   </div>
    //   <span class="pull-right">
    //     <img [src]="image.imagePath" alt="{{ image.title }}" class="img-responsive" style="max-height: 50px;">
    //   </span>
    // </a>

	</div>
</div>

// image-item.html
<a *ngFor="let image of images" href="#" class="list-group-item clearfix">
<div class="pull-left">
  <h4 class="list-group-item-heading">{{ image.name }}</h4>
  <p class="list-group-item-text">{{ image.description }}</p>
</div>
<span class="pull-right">
  <img [src]="image.imagePath" alt="{{ image.title }}" class="img-responsive" style="max-height: 50px;">
</span>
</a>






// click on an image in the list to display it in the edit comonent

// image-list.html
// create click listener 'onRecipeSelected' which passes the $event
(click)="onRecipeSelected()"		// don't need $event

// -item.ts
// create @Output property recipe: Recipe as new EventEmitter<recipe>
@Output() recipeSelected = new EventEmitter<void>();

// note: don't need data cuz it will come from html so no need for {name: string, description: string, imagePath: string }

// create onRecipeSelected method that emits the notification but doesn't pass any data
onRecipeSelected() {
	this.recipeSelected.emit();
}



