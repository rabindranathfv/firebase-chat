import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<any>;
  public chats: any[] = [];
  constructor(private firestore: AngularFirestore) { }

  /**
   * loadMessages
   */
  public loadMessages() {
    this.itemsCollection = this.firestore.collection<any>('chats');
    return this.itemsCollection.valueChanges();
  }
}
