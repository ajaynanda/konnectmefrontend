import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../userProfile/profile/profile.component';
import { UserComponent } from './user.component';
import { ChatComponent } from '../chat/chat.component';
const routes: Routes = [
  {
    path:'dashboard',
    component:UserComponent
  },
  {
    path:'myprofile/:id',
    component:ProfileComponent
  },
  {
    path:'chat',
    component:ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
