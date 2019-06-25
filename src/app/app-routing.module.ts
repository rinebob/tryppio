import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageListComponent } from './images/image-list/image-list.component';
import { ImageCreateComponent } from './images/image-create/image-create.component';

import { MainMapComponent} from './main-map/main-map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { StoryComponent } from './story/story.component';
import { GridComponent } from './grid/grid.component';
// import { ImgListComponent } from './image/img-list.component';
// import { ImgList2Component } from './image/img-list2.component';



const routes: Routes = [
{ path: '', component: MainMapComponent },
{ path: 'dashboard', component: ImageListComponent },
{ path: 'images', component: ImageListComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'story', component: StoryComponent },
{ path: 'grid', component: GridComponent},
{ path: 'create', component: ImageCreateComponent, canActivate: [AuthGuard] },
{ path: 'edit/:imageId', component: ImageCreateComponent, canActivate: [AuthGuard] },
{ path: 'auth', loadChildren: './auth/auth.module#AuthModule'}


// { path: '', component: DashboardComponent },
// { path: 'images', component: ImgList2Component },
// { path: 'images/creatorId', component: ImgList2Component },
// { path: 'create', component: ImageCreateComponent},
// { path: 'edit/:imageId', component: ImageCreateComponent },

]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [RouterModule],

  providers: [AuthGuard]

})

export class AppRoutingModule {}
