import { Component, inject, NgZone, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessagingService } from '../../services/messaging.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessagePayload } from 'firebase/messaging';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  authService = inject(AuthService)
  router = inject(Router)
  messagingService = inject(MessagingService)
  ngZone = inject(NgZone)

  message? : MessagePayload | null 
  public messageTitle?: string = "";
  public messageBody?: string = "";

  signOut()
  {
    this.authService.logOut()
    this.router.navigate(['/login'])
  }

  constructor()
  {
    this.messagingService.requestPermission()
    this.listenForMessages()
    
  }

  listenForMessages()
  {
    this.messagingService.currentMessage.subscribe((cMessage) =>
      {
        this.ngZone.run(() =>
        {
          if(cMessage)
            {
              //console.log("Message received in Home: ", cMessage)
              this.message = cMessage
              this.messageTitle = cMessage.notification?.title
              this.messageBody = cMessage.notification?.body
              console.log("SERVICE :", this.messageTitle)
              console.log("SERVICE :", this.messageBody)
              //console.log("PORUKA: ", this.message)
            }

        })
      })
  }

  ngOnInit(): void 
  {
    this.messageBody = ""
    this.messageTitle = ""
  }


  

}
