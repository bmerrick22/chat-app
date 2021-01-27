import { HostListener, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-send',
  templateUrl: './chat-send.component.html',
  styleUrls: ['./chat-send.component.css']
})
export class ChatSendComponent implements OnInit {
  charCount: number = 280;
  messageForm: FormGroup;
  sendIcon: FontAwesomeModule = faPaperPlane;
  nextReplyTime: number;
  messageDelay: number;

  constructor(private chatService: ChatService) {
    this.buildForm();
    const currentTime = new Date();
    this.nextReplyTime = currentTime.getTime();
  }

  ngOnInit(): void { }

  updateCount() {
    if(this.messageForm.get('message').value)
      this.charCount = 280 - (this.messageForm.get('message').value.length || 0);
  }


  buildForm() {
    console.log("Buildling Message form group");
    this.messageForm = new FormGroup({
      message: new FormControl('', [
        Validators.required,
        Validators.maxLength(280),
        Validators.minLength(1),
        this.noWhitespaceValidator
      ]),
    });
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  onSubmit() {
    console.log("Sending new message!")
    this.chatService.sendMessage(this.messageForm.get('message').value);
    this.messageForm.reset();
    this.charCount = 280;
  }

}
