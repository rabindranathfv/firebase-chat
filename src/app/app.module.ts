import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from 'src/environments/environment';
import { ChatComponent } from './components/chat/chat.component';
import { ChatService } from './providers/chat.service';
import { LoginComponent } from './components/login/login.component';

// spinnner
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ChatService, NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
