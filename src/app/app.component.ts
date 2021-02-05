import { Component } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebase-chat';

  chats: Observable<any>;
  constructor( private firestore: AngularFirestore) {
    this.chats = firestore.collection('chats').valueChanges();
  }
}
