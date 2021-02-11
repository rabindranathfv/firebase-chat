import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from '../interface/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<any>;
  public chats: Message[] = [];
  constructor(private firestore: AngularFirestore) { }

  /**
   * loadMessages
   */
  public loadMessages() {
    this.itemsCollection = this.firestore.collection<Message>('chats');
    return this.itemsCollection.valueChanges()
           .pipe( map( (messages: Message[]) => {
            this.chats = messages;
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
