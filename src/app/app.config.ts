import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration, withEventReplay} from '@angular/platform-browser';
import {FirebaseApp, initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {Auth, getAuth, provideAuth} from '@angular/fire/auth';
import {Firestore, getFirestore, provideFirestore} from '@angular/fire/firestore';
import {FirebaseOptions} from '@firebase/app';
import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es-ES');

const firebaseOptions: FirebaseOptions = {
  projectId: import.meta.env.NG_APP_FIREBASE_PROJECT_ID,
  appId: import.meta.env.NG_APP_FIREBASE_APP_ID,
  storageBucket: import.meta.env.NG_APP_FIREBASE_STORAGE_BUCKET,
  apiKey: import.meta.env.NG_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.NG_APP_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: import.meta.env.NG_APP_FIREBASE_MESSAGING_SENDER_ID
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideFirebaseApp((): FirebaseApp => initializeApp(firebaseOptions)), provideAuth((): Auth => getAuth()), provideFirestore((): Firestore => getFirestore())
  ]
};
