import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports:  [ FormsModule, NgIf ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent{

private authService = inject(AuthService)
router = inject(Router)

email: string = "";
password: string = "";
username: string = "";
error: string = "";
//functions

constructor()
  {
    console.log(this.authService.currentUserSig())
  }


register()
{
  this.authService.register(this.username, this.email, this.password)
  .subscribe({next: (user) => 
    {
      this.router.navigate(["/verify"])
    },
  error: (err) => 
    {
      this.error = err.code
    }
  })
}



}
