import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalRServiceService } from './signal-rservice.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent  implements OnInit{
  user = '';
  message = '';
  messages: string[] = [];

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.addReceiveMessageListener((user, message) => {
      this.messages.push(`${user}: ${message}`);
    });
  }
  constructor(private signalRService: SignalRServiceService) {}
  title = 'signalR-Client';
  send() {
    this.signalRService.sendMessage(this.user, this.message);
  }
}
