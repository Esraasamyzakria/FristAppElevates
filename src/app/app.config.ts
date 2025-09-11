import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {  provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BASE_URL } from 'auth';
import { provideStore } from '@ngrx/store';
import { headerInterceptor } from './core/interceptors/header.interceptor';
import { questionreducer } from './store/question.reducer';
import { provideEffects } from '@ngrx/effects';
import { loadquestionEffects } from './store/question.effect';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor,loadingInterceptor])),
        provideAnimations(), // required animations providers
    provideToastr(),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),
    { provide: BASE_URL,
        useValue: "https://exam.elevateegy.com"
    }, provideStore({
        questionexam: questionreducer,
    }), provideEffects(loadquestionEffects)]
};
