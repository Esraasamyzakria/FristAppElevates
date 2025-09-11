import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { loggedGuard } from './core/guards/logged.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'subjects', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        title: 'login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'register',
      },
      {
        path: 'forget',
        loadComponent: () =>
          import('./pages/forgetpassword/forgetpassword.component').then(
            (m) => m.ForgetpasswordComponent
          ),
        title: 'forget',
      },
    ],
  },

  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'subjects',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/subject/subject.component').then(
            (m) => m.SubjectComponent
          ),
        title: 'subjects',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (m) => m.DetailsComponent
          ),
        title: 'details',
      },
      {
        path: 'Exams',
        loadComponent: () =>
          import('./pages/exams/exams.component').then((m) => m.ExamsComponent),
        title: 'Exams',
      },
      {
        path: 'Score',
        loadComponent: () =>
          import('./pages/scoreresulat/scoreresulat.component').then(
            (m) => m.ScoreresulatComponent
          ),
        title: 'Score',
      },
      {
        path: 'Resulat',
        loadComponent: () =>
          import('./pages/resulat/resulat.component').then(
            (m) => m.ResulatComponent
          ),
        title: 'Resulat',
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./pages/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
  },
];
