import { Component } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ChatService } from './providers/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebase-chat';

  chats: Observable<any>;
  isLoggin: false;
  constructor( private firestore: AngularFirestore, public chatService: ChatService) {
    this.chats = firestore.collection('chats').valueChanges();
  }

  /**
   * logout
   */
  public logout() {
    this.chatService.logout();    
  }

  /**
   * isUserAuth
   */
  public isUserAuth() {
    console.log('user', this.chatService.user);
    // this.isLoggin = this.chatService.user &&
  }
}
