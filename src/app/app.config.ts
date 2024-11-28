import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideMessaging } from '@angular/fire/messaging';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyAxZY3TzOa8Xd3YgzyknPQ1y4LGjMQ_ItI",
  authDomain: "demoapp-b6738.firebaseapp.com",
  projectId: "demoapp-b6738",
  storageBucket: "demoapp-b6738.firebasestorage.app",
  messagingSenderId: "118920480020",
  appId: "1:118920480020:web:409562408dadea60636e01",
  measurementId: "G-BHLR9WFNH2"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideMessaging(() => getMessaging()),
  
  ]
};
