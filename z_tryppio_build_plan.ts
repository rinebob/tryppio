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
// EXISTING COMPONENTS / MODULES
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
//        NEW FUNCTIONALITY
// ====================================================
// ====================================================
// ====================================================


// ====================================================
// PROJECT CREATION
// ====================================================

// ====================================================
// APP.MODULE
// ====================================================

// ====================================================
// CLICKABLE PROTOTYPE
// ====================================================

// ====================================================
// UPLOAD IMAGE
// ====================================================

// ====================================================
// VIEW IMAGE
// ====================================================

// ====================================================
// EDIT IMAGE METADATA
// ====================================================

// ====================================================
// LOCATE IMAGE ON MAP
// ====================================================


