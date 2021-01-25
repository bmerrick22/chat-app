import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {
  messages: any = [];

  constructor(private chatService: ChatService) {
    this.enterChat();
    this.syncChat();
  }

  ngOnInit(): void {
  }

  enterChat(){
    this.chatService.sendMessage("has joined the chat");
  }

  syncChat() {
    //Subscribe to any new received messages
    this.chatService.newMessage().subscribe((data) => {
      console.log("Received new chat messsage!");
      this.messages.push(data);
    },
      (error) => {
        console.log("Server Error");
      });
  }

}
