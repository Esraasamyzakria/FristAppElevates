import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [
  {path:'',component:AuthLayoutComponent ,children: [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent,title:'login'},
    {path:'register',component:RegisterComponent,title:'register'},
    {path:'forget',component:ForgetpasswordComponent,title:'forget'},
  ] },
  {path:'',component:MainLayoutComponent,children:[
    {path:'home',component:HomeComponent,title:'home'}
  ]}
];

