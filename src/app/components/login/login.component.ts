import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, NgIf ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService)
  router = inject(Router)


  email: string = "";
  password: string = "";
  errorMessage : string = "";
  

  login()
  {
    this.authService.login(this.email, this.password).subscribe({
      next: () =>
      {
        this.router.navigate(["/home"])
      },
      error: (err) =>
      {
        this.errorMessage = err.code
      }
    })
  }

  

}
