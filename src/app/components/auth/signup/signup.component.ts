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
import { HttpClient } from '@angular/common/http';

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
      // confirmPassword: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      // phoneNumber: new FormControl(''),
    }
    // { validators: matchPasswords('password', 'confirmPassword') }
  );

  getFormValue(inputName: string) {
    return this.signupForm.get(inputName);
  }

  public errorMsg: string | null = null;

  get passwordMismatchError(): boolean {
    return this.signupForm.hasError('passwordsMismatch');
  }

  constructor(
    public authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.http
      .post<{ user: IUser }>('http://localhost:3000/auth/signup', {
        email: this.signupForm.value.email,
        name: this.signupForm.value.name,
        password: this.signupForm.value.email,
        phone: this.signupForm.value.phone,
      })
      .subscribe({
        next: (res) => {
          if (res.user?.access_token) {
            console.log(res.user)
            localStorage.setItem('token', res.user.access_token!);
            this.authService.currentUserSig.set(res.user);
            this.router.navigateByUrl('/');
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
