import { inject, Injectable, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { getToken, Messaging } from '@angular/fire/messaging';
import { MessagePayload, onMessage } from 'firebase/messaging';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  firebaseMessaging = inject(Messaging)

  private messageSource = new BehaviorSubject<MessagePayload | null>(null)
  currentMessage = this.messageSource.asObservable();

  constructor()
  {
    this.requestPermission()
    this.listenForMessage()
  }

  requestPermission()
  {
    Notification.requestPermission().then(
      (notificationPermissions: NotificationPermission) => 
        {
          if (notificationPermissions === "granted")
            {
              console.log("Granted");
            }
          if (notificationPermissions === "denied")
            {
              console.log("Denied");
            }
        });

    getToken(this.firebaseMessaging, {vapidKey: "BIdB9bgRvi0AhYcUn2s8ZyqxLcDzhtE-Cxy3iIT1ESeES1wSEPRfa8U9kM-9eIIVH8ghQADEbEEf3Tjv9pOhwb8"})
    .then((FCMToken) =>
    {
      console.log(FCMToken)
    })
    .catch((err) =>
    {
      console.log(err)
    })
  }

  listenForMessage()
  {
    onMessage(this.firebaseMessaging, (payload) =>
    {
      console.log('Message received in service:', payload);
      this.messageSource.next(payload);
    })
  }

}
