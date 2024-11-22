import { ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

const firebaseConfig = {
  apiKey: "AIzaSyAiKUrsVjql6xpQ7yv88fC5abn_PtjFP3E",
  authDomain: "angular-test-3c41b.firebaseapp.com",
  projectId: "angular-test-3c41b",
  storageBucket: "angular-test-3c41b.firebasestorage.app",
  messagingSenderId: "614543026777",
  appId: "1:614543026777:web:826447e73858c5c6349f48",
  measurementId: "G-JYDG6DFXEE"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
