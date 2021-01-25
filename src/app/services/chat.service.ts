import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})


export class ChatService {

  private CONNECTION_POINT = 'http://localhost:3000';
  private socket: any;
  private user: string;

  constructor() {
    //Establish the connection to the socket
    this.establishSocket();
    //Call data subcscription to message logs
  }

  establishSocket() {
    this.socket = io(this.CONNECTION_POINT, { transports: ['websocket'] });
    console.log("Established Connection to Node Server");
  }

  loginStatus() {
    let observable = new Observable<{ username: String, status: Boolean }>(observer => {
      this.socket.on('login-status', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }

  sendMessage(message) {
    let data = {username: this.user, message: message};
    console.log(data);
    this.socket.emit('message-sent', data);
  }

  userLogin(data) {
    this.user = data.username;
    this.socket.emit('user-login', data);
  }

  newMessage() {
    let observable = new Observable<{ user: String, message: String }>(observer => {
      this.socket.on('new-message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }

  newUser(){
    console.log(this.user);
    this.socket.emit('new-user', this.user);
  }

  getConnectedUsers(){
    let observable = new Observable<[]>(observer => {
      this.socket.on('connected-users', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); }
    });
    return observable;
  }




}
