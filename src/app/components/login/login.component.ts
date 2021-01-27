import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('login') loginContainer: ElementRef;
  loginForm: FormGroup;
  loginResult: Boolean = false;
  loginError: Boolean = false;
  errorIcon: FontAwesomeModule = faExclamationTriangle;
  returnUrl;
  constructor(
    private router: Router,
    private chatService: ChatService,
    private authService: AuthService) {

    this.constructForm();

  }

  ngOnInit() {
    //this.checkUserAuthenticated();
  }

  checkUserAuthenticated() {
    //Check to see with auth service if user already logged in
    console.log(this.authService.getCurrentUser());
    if(this.authService.getCurrentUser())
      this.router.navigate(['chat']);
  }


  loginStatus() {
    this.authService.getLoginStatus().subscribe((credentials) => {
      if(credentials.status == null)
        return;

      console.log("Login status received");
      console.log(credentials);
      this.loginResult = true;
      if (credentials.status) {
        this.loginError = false;
        this.router.navigate(['chat']);
      } else {
        this.loginError = true;
      }

    }, (error) => {
      console.log("Server Error - " + error);
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
    //Collect and display login attempt
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    console.log("Login Attempt");
    console.log("Username: " + username);
    console.log("Password: " + password);

    //Attempt login through authorization service
    this.authService.attemptLogin(username, password);

    //Listen for the login result
    this.loginStatus();
    //Reset the form
    this.loginError = false;
    this.loginForm.reset();

  }

}
