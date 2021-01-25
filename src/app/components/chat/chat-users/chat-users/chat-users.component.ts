import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCommentDots, faDotCircle } from '@fortawesome/free-regular-svg-icons';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.css']
})
export class ChatUsersComponent implements OnInit {

  usersList: any;
  typingIcon: FontAwesomeModule = faCommentDots;
  connectedIcon: FontAwesomeModule = faDotCircle;

  constructor(private chatService: ChatService) {
    this.chatService.newUser();
    this.syncUsers();
  }

  ngOnInit(): void {
  }

  syncUsers() {
    //Subscribe to any new received messages
    this.chatService.getConnectedUsers().subscribe((data) => {
      console.log(data);
      this.usersList = data;
    },
      (error) => {
        console.log("Server Error");
      });

  }
}
