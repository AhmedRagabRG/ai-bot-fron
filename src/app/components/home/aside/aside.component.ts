import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, output } from '@angular/core';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aside.component.html',
})
export class AsideComponent {
  allChats: any = [];
  chat: any;
  @Output() chatChange: EventEmitter<any> = new EventEmitter<any>(); 

  constructor(private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.http
      .post('http://localhost:3000/gemini/chats', {
        id: 1,
      })
      .subscribe({
        next: (data: any) => {
          this.allChats.push(...data);
        },
        error: (err: any) => {
          console.error('Error occurred:', err);
        },
      });
  }

  selectChat(chat: any) {
    this.http
      .get(`http://localhost:3000/gemini/chat/${chat.id}`)
      .subscribe({
        next: (data: any) => {
          this.chatChange.emit(data);
        },
        error: (err: any) => {
          console.error('Error occurred:', err);
        },
      });
  }

  addChat() {
    this.http
      .post('http://localhost:3000/gemini/chat/create', {
        name: "test chat",
      })
      .subscribe({
        next: (data: any) => {
          console.log(data);
          this.allChats.push(data);
        },
        error: (err: any) => {
          console.error('Error occurred:', err);
        },
      });
  }
}
