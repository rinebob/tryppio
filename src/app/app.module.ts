
import { ImagesModule } from './images/images.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { MatToolbar } from '@angular/material';
import { AngularMaterialModule } from './angular-material.module';

// Google Maps API Module
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window/snazzy-info-window.module';


import { MatGridListModule } from '@angular/material/grid-list';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { StoryComponent } from './story/story.component';
import { GridComponent } from './grid/grid.component';
import { ErrorComponent } from './error/error.component';
import { MainMapComponent } from './main-map/main-map.component';

import { ImgListComponent } from './image/img-list.component';
import { ImgList2Component } from './image/img-list2.component';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';

// from auth0 tutorial
// https://auth0.com/blog/creating-beautiful-apps-with-angular-material/
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // MatToolbar,
    ErrorComponent,
    MainMapComponent,
    DashboardComponent,
    ProfileComponent,
    StoryComponent,
    GridComponent,
    ImgListComponent,
    ImgList2Component
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AngularMaterialModule,
    FlexLayoutModule,
    ImagesModule,

    MatGridListModule,


    // Google Maps
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCtcLDNMpKxNoV766X1JozshsvVUPDR2wA'
    }),
    AgmSnazzyInfoWindowModule,
  ],

  // imports AuthInterceptor from auth-interceptor.ts and ErrorInterceptor from error-interceptor.ts
  // every ougoing http request will have the auth token attached as req.headers.authorization
  // make sure headers.authorization is allowed in app.js res.setHeader("Access-Control-Allow-Headers"
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
