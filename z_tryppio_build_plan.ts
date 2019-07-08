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

// * created only - no functionality

// ****************************************************
// ****************************************************
// ****************************************************
// EXISTING FUNCTIONALITY
// ****************************************************
// ****************************************************
// ****************************************************

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



// ****************************************************
// ****************************************************
// ****************************************************
//        STORY BOARDS - MVP ONLY
// ****************************************************
// ****************************************************
// ****************************************************

when going to URL www.tryppio.com

user is presented with:

menu bar at top with options:
Upload
View
Edit
Locate

Google map in main area:
centered on location:
showing image icons at correct location for each image

image list in right sidebar

possible user actions:
click on menu option:

upload
view
edit
locate

manipulate map
zoom in/out
change map type
pan
hover over icon to view image card
click on icon to open image card

use filter field to limit displayed images and cards
hover over image list record to animate corresponding map marker
click on image in list to pop open corresponding image card in map



// ****************************************************
// ****************************************************
// ****************************************************
//        NEW FUNCTIONALITY
// ****************************************************
// ****************************************************
// ****************************************************


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


