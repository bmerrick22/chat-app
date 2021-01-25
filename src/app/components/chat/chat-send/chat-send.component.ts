import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FontawesomeObject } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-send',
  templateUrl: './chat-send.component.html',
  styleUrls: ['./chat-send.component.css']
})
export class ChatSendComponent implements OnInit {

  messageForm:FormGroup;
  sendIcon: FontAwesomeModule = faPaperPlane;
  constructor(private chatService: ChatService) {
    this.buildForm();
   }

  ngOnInit(): void {
  }


  buildForm(){
    console.log("Buildling Message form group");
    this.messageForm = new FormGroup({
      message: new FormControl('', [
        Validators.required
      ]),
    });
  }

  onSubmit(){
    console.log("Sending new message!")
    this.chatService.sendMessage(this.messageForm.get('message').value);
    this.messageForm.reset();
  }

}
