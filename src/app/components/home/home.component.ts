import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AsideComponent } from './aside/aside.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AsideComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  allMessages: any = [];

  messsages = new FormGroup({
    message: new FormControl(''),
  });

  constructor(private http: HttpClient) {}

  generateMessage() {
    const prompt = this.messsages.get('message')!.value;

    this.allMessages.push({
      txt: this.messsages.get('message')!.value,
      isUser: true,
    });
    this.messsages.get('message')!.setValue('');
    this.http
      .post('http://localhost:3000/gemini/text', {
        prompt,
      })
      .subscribe({
        next: (data: any) => {
          this.allMessages.push({
            txt: data.text,
            isUser: false,
          });
        },
        error: (err: any) => {
          console.error('Error occurred:', err);
        },
      });
  }

  onChatChange($event: any) {
    $event.forEach((data: any) => {
      this.allMessages.push({
        txt: data.parts[0].text,
        isUser: data.role === 'user' ? true : false,
      });
    });
  }
}
