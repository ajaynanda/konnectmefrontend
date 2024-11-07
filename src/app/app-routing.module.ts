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

const routes: Routes = [
  {
    path:'login',component:LoginComponent,
  },
  {path:'forgotpassword',component:ForgotpasswordComponent},
  {path:'otpverify',component:OtpverifyComponent},
  {path:'terms',component:TermsComponent},
  {path:'policy',component:PolicyComponent},
  {path:'membership',component:MembershipComponent},
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {
    path:'user',
    loadChildren:()=>import('./user/user.module').then(x=>x.UserModule)
  },
  {
    path:'myprofile',
    loadChildren:()=>import('./userProfile/profile.module').then(x=>x.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
