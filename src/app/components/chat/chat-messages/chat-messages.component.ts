import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-messages',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.css']
})
export class ChatMessagesComponent implements OnInit {
  @ViewChild('messageBody') messageBody: ElementRef;

  messages: any = [];
  scrollVal: number;

  constructor(private chatService: ChatService, private vps: ViewportScroller) {
    console.log(sessionStorage);
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
      this.updateScroll(); 
    },
      (error) => {
        console.log("Server Error");
      });
  }

  updateScroll(){
    this.messageBody.nativeElement.scrollTop = (this.messageBody.nativeElement.scrollHeight);
  }

}
