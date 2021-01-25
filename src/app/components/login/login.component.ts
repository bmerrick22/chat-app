import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('login') loginContainer: ElementRef;
  loginForm: FormGroup;
  loginResult: Boolean = true;
  errorIcon: FontAwesomeModule = faExclamationTriangle;

  constructor(private router: Router, private chatService: ChatService) {
    this.constructForm();
    this.syncLogin();
  }

  ngOnInit(): void {
  }

  syncLogin() {
    this.chatService.loginStatus().subscribe((data) => {
      console.log("Received login status result");
      if(data.status){
        console.log("Valid login");
        this.loginResult = true;
        localStorage.setItem('currentUser', data.username)
        this.router.navigate(['chat']);
      } else{
        this.loginResult = false;
        console.log("Invalid login");
      }
    },
      (error) => {
        console.log("Server Error");
      });

  }

  constructForm() {
    console.log("Buildling login form group");
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    });

  }

  onSubmit() {
    console.log("Collecting login information...");
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;
    console.log("Username: " + username);
    console.log("Password: " + password);

    this.loginForm.reset(); //Reset the form
    this.loginResult = true; //Reset the result -> overriden by observable
    this.chatService.userLogin({username: username, password: password})
  }

}
