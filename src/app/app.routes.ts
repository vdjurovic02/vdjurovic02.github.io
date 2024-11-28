import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AuthGuard } from './guards/auth.guard';
import { VerifyemailComponent } from './components/verifyemail/verifyemail.component';
import { EmailGuard } from './guards/email.guard';
export const routes: Routes = [
    
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "home", component: HomeComponent, canActivate: [AuthGuard, EmailGuard]},
    {path: "verify", component: VerifyemailComponent},

    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "**", component: PagenotfoundComponent}


];
