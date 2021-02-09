import { Component } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  message = '';

  constructor( private chatService: ChatService) {
    this.chatService.loadMessages().subscribe((messages: any[]) => {
      console.log(messages);
    });
   }

  /**
   * sendMessage
   */
  public sendMessage( ) {
    console.log(`el mensage ${this.message}`);
  }



}
