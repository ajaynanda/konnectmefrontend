import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MembershipComponent } from './membership/membership.component';
import { PolicyComponent } from './policy/policy.component';
import { RegisterComponent } from './register/register.component';
import { TermsComponent } from './terms/terms.component';
import { ForgotpasswordComponent } from './password/forgotpassword/forgotpassword.component';
import { OtpverifyComponent } from './password/otpverify/otpverify.component';
import { AuthGuard, AuthGuard2 } from './auth.guard';

const routes: Routes = [
  {
    path:'login',component:LoginComponent,canActivate:[AuthGuard2]
  },
  {path:'forgotpassword',component:ForgotpasswordComponent,canActivate:[AuthGuard2]},
  {path:'otpverify',component:OtpverifyComponent,canActivate:[AuthGuard2]},
  {path:'terms',component:TermsComponent,canActivate:[AuthGuard2]},
  {path:'policy',component:PolicyComponent,canActivate:[AuthGuard2]},
  {path:'membership',component:MembershipComponent,canActivate:[AuthGuard2]},
  {path:'',component:HomeComponent,canActivate:[AuthGuard2]},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard2]},
  {path:'register',component:RegisterComponent,canActivate:[AuthGuard2]},
  {
    path:'user',
    loadChildren:()=>import('./user/user.module').then(x=>x.UserModule),canActivate:[AuthGuard]
  },
  {
    path:'myprofile',
    loadChildren:()=>import('./userProfile/profile.module').then(x=>x.ProfileModule),canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
