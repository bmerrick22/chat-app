import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})


export class ChatService {
  private user: string;

  constructor(
    private socketService: SocketService,
    private authService: AuthService
  ) { }


  sendMessage(message) {
    console.log(this.authService.getCurrentUser());
    let data = { username: this.authService.getCurrentUser(), message: message };
    console.log(data);
    this.socketService.getSocket().emit('message-sent', data);
  }


  newMessage() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socketService.getSocket().on('new-message', (data) => {
        observer.next(data);
      });
      return () => { this.socketService.getSocket().disconnect(); }
    });
    return observable;
  }

  newUser() {
    console.log(this.authService.getCurrentUser());
    this.socketService.getSocket().emit('new-user', this.authService.getCurrentUser());
  }

  getConnectedUsers() {
    let observable = new Observable<[]>(observer => {
      this.socketService.getSocket().on('connected-users', (data) => {
        observer.next(data);
      });
      return () => { this.socketService.getSocket().disconnect(); }
    });
    return observable;
  }

}
