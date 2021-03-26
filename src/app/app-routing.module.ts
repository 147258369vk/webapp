import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'imageupload',
    component:ImageuploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
