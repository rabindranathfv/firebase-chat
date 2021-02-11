import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message = '';
  autoScroll: any;

  constructor( public chatService: ChatService) {
    this.chatService.loadMessages().subscribe(() => {
      // setTimeout(() => {
      //   this.autoScroll.scrollTop = this.autoScroll.scrollHeight;
      // }, 50);
    });
   }

   ngOnInit() {
    // this.autoScroll = document.getElementById('app-mensajes');
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
