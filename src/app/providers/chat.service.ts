import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Message } from '../interface/message.interface';
import { User } from '../interface/user.interface';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<any>;
  public chats: Message[] = [];
  user: User;

  constructor(private firestore: AngularFirestore, public authFB: AngularFireAuth, private spinner: NgxSpinnerService) {
    this.spinner.show(undefined,
      {
        type: 'pacman',
        size: 'large',
        bdColor: 'rgba(100,149,237, .8)',
        color: 'white',
        fullScreen: true
      }
    );
    this.authFB.authState.subscribe(user => {
      if ( !user) { return; }
      this.user = user;
      setTimeout(() => this.spinner.hide(), 2500);
    });
   }

  login( provider: string ) {
    this.spinner.show(undefined,
      {
        type: 'ball-fall',
        size: 'large',
        bdColor: 'rgba(100,149,237, .8)',
        color: 'white',
        fullScreen: true
      }
    );
    if ( provider === 'google') {
      this.authFB.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.authFB.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
    setTimeout(() => this.spinner.hide(), 2500);
  }

  logout() {
    this.spinner.show(undefined,
      {
        type: 'square-spin',
        size: 'medium',
        bdColor: 'rgba(100,149,237, .8)',
        color: 'white',
        fullScreen: true
      }
    );
    this.user = { uid: null, displayName: null, email: null, emailVerified: null, photoURL: null};
    this.authFB.auth.signOut();
    setTimeout(() => this.spinner.hide(), 2500);
  }

  /**
   * loadMessages
   */
  public loadMessages() {
    this.spinner.show(undefined,
      {
        type: 'timer',
        size: 'large',
        bdColor: 'rgba(100,149,237, .8)',
        color: 'white',
        fullScreen: true
      }
    );
    this.itemsCollection = this.firestore.collection<Message>('chats', query => query.orderBy('date', 'desc').limit(8));
    return this.itemsCollection.valueChanges()
           .pipe( map( (messages: Message[]) => {
            this.chats = [];
            for (const msg of messages) {
              this.chats.unshift(msg);
            }
            setTimeout(() => this.spinner.hide(), 2500);
          }));
  }

  /**
   * sendMessage
   */
  public sendMessage( msg: string) {
    this.spinner.show(undefined,
      {
        type: 'fire',
        size: 'large',
        bdColor: 'rgba(100,149,237, .8)',
        color: 'white',
        fullScreen: true
      }
    );
    const message: Message = {
      name: this.user.displayName,
      message: msg,
      userUid: this.user.uid,
      date: new Date().getTime()
    };
    setTimeout(() => this.spinner.hide(), 1500);
    return this.itemsCollection.add( message );
  }
}
