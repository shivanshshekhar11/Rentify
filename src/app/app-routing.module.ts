import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BuyerHomeComponent } from './buyer-home/buyer-home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostFormComponent } from './post-form/post-form.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'buyer', component: BuyerHomeComponent },
  { path: 'seller', component: SellerHomeComponent },
  { path: 'listing-details', component: PostDetailsComponent },
  { path: 'listing-data', component: PostFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
