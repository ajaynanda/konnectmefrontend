import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { PostbarsComponent } from './postbar/postbar.component';
import { RightbarsComponent } from './rightbar/rightbar.component';
import { LeftbarsComponent } from './leftbars/leftbars.component';
import { UpdateComponent } from './update/update.component';
import { FormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    ProfileComponent,
    RightbarsComponent,
   LeftbarsComponent,
    PostbarsComponent,
   UpdateComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
   FormsModule,
  NgImageSliderModule,
  MatMenuModule,
  MatIconModule
  ],
 
})
export class ProfileModule { }
