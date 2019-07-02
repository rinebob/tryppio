import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window/snazzy-info-window.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { AngularMaterialModule } from './angular-material.module';


import { AppRoutingModule } from './app-routing.module';
import { ImagesModule } from './images/images.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { StoryComponent } from './story/story.component';
import { GridComponent } from './grid/grid.component';
import { ErrorComponent } from './error/error.component';
import { MainMapComponent } from './main-map/main-map.component';
import { ImgListComponent } from './image/img-list.component';
import { ImgList2Component } from './image/img-list2.component';
// import { SandboxComponent } from './z_sandbox/sandbox.component';

import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';

// from auth0 tutorial
// https://auth0.com/blog/creating-beautiful-apps-with-angular-material/
import { FlexLayoutModule } from '@angular/flex-layout';
// see also https://blog.angularindepth.com/angular-flex-layout-flexbox-and-grid-layout-for-angular-component-6e7c24457b63


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
    ImgList2Component,
    // SandboxComponent,
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
