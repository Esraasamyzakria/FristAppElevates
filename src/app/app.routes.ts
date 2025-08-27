import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgetpasswordComponent } from './pages/forgetpassword/forgetpassword.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SubjectComponent } from './pages/subject/subject.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { loggedGuard } from './core/guards/logged.guard';
import { authGuard } from './core/guards/auth.guard';
import { DetailsComponent } from './pages/details/details.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { ScoreresulatComponent } from './pages/scoreresulat/scoreresulat.component';
import { ResulatComponent } from './pages/resulat/resulat.component';



export const routes: Routes = [
    {path:'',redirectTo:'subjects',pathMatch:'full'},
  {path:'',component:AuthLayoutComponent ,canActivate:[loggedGuard] ,children: [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent,title:'login'},
    {path:'register',component:RegisterComponent,title:'register'},
    {path:'forget',component:ForgetpasswordComponent,title:'forget'},
  ] },
{

  path: '',
  component:DashboardComponent,
  children: [
        {path:'subjects',component:SubjectComponent,canActivate:[authGuard],title:'subjects'},
        { path: 'details/:id', component: DetailsComponent,title:'details' },
        { path: 'Exams', component:ExamsComponent,title:'Exams' },
        { path: 'Score', component:ScoreresulatComponent,title:'Score' },
        { path: 'Resulat', component:ResulatComponent,title:'Resulat' },
  ]
},
{path:"**",component:NotfoundComponent}
];

