import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';


@Injectable({
  providedIn: 'root'
})
export class SignalRServiceService {
  private hubConnection!: signalR.HubConnection;

  startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${environment.apiUrl}/chathub`)
    .build();
    this.hubConnection
    .start()
    .then(() => console.log('SignalR Connected'))
    .catch(err => console.log('Error while starting SignalR: ', err));
  }

  addReceiveMessageListener(callback: (user: string, message: string) => void) {
    this.hubConnection.on('ReceiveMessage', callback);
  }

  sendMessage(user: string, message: string) {
    this.hubConnection.invoke('SendMessage', user, message).catch(err => console.error(err));
  }
  

  constructor() { }
}
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7289'
};
