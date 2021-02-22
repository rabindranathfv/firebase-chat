import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Message } from '../interface/message.interface';
import { User } from '../interface/user.interface';
import { NonNullAssert } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;
  public chats: Message[] = [];
  user: User;

  constructor(private firestore: AngularFirestore, public authFB: AngularFireAuth) {
    this.authFB.authState.subscribe(user => {
      if ( !user) { return; }
      this.user = user;
      console.log('user', this.user);
    });
   }

  login( provider: string ) {
    if ( provider === 'google') {
      this.authFB.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.authFB.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }

  logout() {
    this.user = { uid: null, displayName: null, email: null, emailVerified: null, photoURL: null};
    this.authFB.auth.signOut();
  }

  /**
   * loadMessages
   */
  public loadMessages() {
    this.itemsCollection = this.firestore.collection<Message>('chats', query => query.orderBy('date', 'desc').limit(8));
    return this.itemsCollection.valueChanges()
           .pipe( map( (messages: Message[]) => {
            this.chats = [];
            for (const msg of messages) {
              this.chats.unshift(msg);
            }
          }));
  }

  /**
   * sendMessage
   */
  public sendMessage( msg: string) {
    const message: Message = {
      name: 'userDemo',
      message: msg,
      date: new Date().getTime()
    };
    return this.itemsCollection.add( message );
  }
}
