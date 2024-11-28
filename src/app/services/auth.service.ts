import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, user } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth)
  currentUserSig = signal<IUser | null | undefined>(undefined)

  register(username: string, email: string, password: string) : Observable<void>
  {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password)
    .then(response => {
      console.log(response.user, username)
      updateProfile(response.user, {displayName: username})
      sendEmailVerification(response.user)
    })

    return from(promise)

  }

  login(email: string, password: string) : Observable<void>
  {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password)
    .then(() => {})

    return from(promise)
  }

  logOut() : Observable<void>
  {
    const promise = signOut(this.firebaseAuth)

    return from(promise)
  }
}
