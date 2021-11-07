import { Component } from '@angular/core';
import * as firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appCompras';

  ngOnInit() {
    firebase.default.initializeApp({
      apiKey: "AIzaSyBqGJyG_nZJlHvAuojASh0JldsYMZ1r5d4",
      authDomain: "appcompras-2a58f.firebaseapp.com",
    });
  }
}
