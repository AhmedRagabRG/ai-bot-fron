import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user } from '@angular/fire/auth';
import { first, from, Observable } from 'rxjs';
import { IUser } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSign = signal<IUser | null | undefined>(undefined);
  
  constructor() {}

  public register(userData: IUser): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, userData.email!, userData.password!).then(response => {
      updateProfile(response.user, { displayName: `${userData.firstName} ${userData.lastName}` });
    }).catch(error => {
      console.log('Error registering user:', error);
    });

    return from(promise);
  }

  public login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {})
    
    return from(promise);
  }
}
