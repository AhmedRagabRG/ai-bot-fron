import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { IUser } from '../../../services/interfaces/user';
import { CommonModule } from '@angular/common';
import { AutHeaderComponent } from '../aut-header/aut-header.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, CommonModule, AutHeaderComponent, ReactiveFormsModule, SweetAlert2Module],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public loginForm: any = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public errorMsg: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
  ) {}

  onSubmit(): void {
    this.http.post<{user: IUser}>('http://localhost:3000/auth/login', {
      user: this.loginForm.getRawValue(),
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.user.access_token!);
        this.authService.currentUserSig.set(res.user);
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
