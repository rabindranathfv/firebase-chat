import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  message = '';
  autoScroll: any;
  @ViewChild('scrollDown', { static: false}) private scrollContainer: ElementRef;

  constructor( public chatService: ChatService) {
    this.chatService.loadMessages().subscribe(() => {
      this.scrollToBottom();
    });
   }

   ngOnInit() {
    this.scrollToBottom();
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

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      } catch (err) { }
  }

}
