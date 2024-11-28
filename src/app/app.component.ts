import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  

  authService = inject(AuthService)
  router = inject(Router)


  ngOnInit(): void 
  {
    this.authService.user$.subscribe((user : User) => {
      if(user)
      {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
          emailVerified: user.emailVerified
        });
      }
      else
      {
        this.authService.currentUserSig.set(null);
      }
    })

  }

  

}
