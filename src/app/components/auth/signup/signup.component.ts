import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { IUser } from '../../../services/interfaces/user';
import { AutHeaderComponent } from '../aut-header/aut-header.component';
import { CommonModule } from '@angular/common';
import { matchPasswords } from '../../../validators/match-password';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AutHeaderComponent,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  public signupForm: any = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ]),
      whereDidYouHearAboutUs: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl(''),
      role: new FormControl(''),
    },
    { validators: matchPasswords('password', 'confirmPassword') }
  );

  getFormValue(inputName: string) {
    return this.signupForm.get(inputName);
  }

  public errorMsg: string | null = null;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (user: IUser) => {
        this.authService.currentUserSign.set(
          user ? { email: user.email! } : null
        );
      },
    });
  }

  get passwordMismatchError(): boolean {
    return this.signupForm.hasError('passwordsMismatch');
  }

  register(): void {
    const { email, password, firstName, lastName } = this.signupForm.value;
    
    if (this.signupForm.invalid) return;
    if (!email || !password) return;
  
    this.authService
      .register({
        email,
        password,
        firstName,
        lastName,
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/login');
        },
        error: (error): void => {
          this.errorMsg = error.code;
        },
      });
  }
  
}
