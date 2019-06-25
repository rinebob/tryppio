import { AngularMaterialModule } from './../angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { ImageCreateComponent } from './image-create/image-create.component';
import { ImageListComponent } from './image-list/image-list.component';


@NgModule({
  declarations: [
    ImageCreateComponent,
    ImageListComponent
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule

  ],
})


export class ImagesModule {}
