import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './aut-header.component.html'
})
export class AutHeaderComponent {
  isActive: any = false
}
