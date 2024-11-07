import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharebarComponent } from '../sharebar/sharebar.component';
import { PostbarComponent } from '../postbar/postbar.component';
import { LeftbarComponent } from '../leftbar/leftbar.component';
import { RightbarComponent } from '../rightbar/rightbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NgImageSliderModule } from 'ng-image-slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatMenuModule} from '@angular/material/menu'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChatComponent } from '../chat/chat.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    UserComponent,
    SharebarComponent,
    LeftbarComponent,
    RightbarComponent,
    PostbarComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    SlickCarouselModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    NgSelectModule
    
  ],

})
export class UserModule { }
