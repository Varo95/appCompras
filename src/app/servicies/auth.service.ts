import { Injectable } from '@angular/core';
import * as firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  registerUser(userdata:any) {
    firebase.default.auth().createUserWithEmailAndPassword(userdata.email,userdata.password)
      .catch(error => {
          console.log(error);
        }
      );
  }
}
