import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private CONNECTION_POINT = 'http://localhost:3000';
  private socket: any;

  constructor() {
    //Establish the connection to the socket
    this.establishSocket();
  }

  establishSocket() {
    this.socket = io(this.CONNECTION_POINT, { transports: ['websocket'] });
    console.log("Established Connection to Node Server");
  }

  getSocket(){
    return this.socket;
  }
}
