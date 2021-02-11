import { Component } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  message = '';

  constructor( public chatService: ChatService) {
    this.chatService.loadMessages().subscribe();
   }

  /**
   * sendMessage
   */
  public sendMessage( ) {
    if ( this.message.length === 0 ) { return; }
    this.chatService.sendMessage( this.message )
        .then( () => this.message = ''   )
        .catch( (err) => console.log(err));

  }



}
