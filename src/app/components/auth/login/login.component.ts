import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { IUser } from '../../../services/interfaces/user';
import { CommonModule } from '@angular/common';
import { AutHeaderComponent } from '../aut-header/aut-header.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (user: IUser) => {
        this.authService.currentUserSign.set(user ? { email: user.email! } : null);
      },
    });
  }

  login(): void {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (error): void => {
        console.log('error');
      },
    });
  }
}
