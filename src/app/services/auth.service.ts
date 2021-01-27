import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatusSub: BehaviorSubject<any>;
  private currentUser: string;

  constructor(private socketService: SocketService, private router: Router) {
    this.loginStatusSub = new BehaviorSubject<any>({});
    //Protect login
    // this.protectRedirect();
    this.listenLogin();
  }

  protectRedirect() {
    if (!this.getCurrentUser())
      this.router.navigate(['']);
  }


  attemptLogin(username, password) {
    console.log("Attempting login");
    // Emit the attempted login to the server
    let attempt = { username: username, password: password }
    this.socketService.getSocket().emit('login-attempt', attempt);
  }

  listenLogin() {
    // Listen for the login result
    this.socketService.getSocket().on('login-result', (result) => {
      console.log("Received login result...");
      console.log(result);
      if (result.status)
        this.validLogin(result);
      else
        this.invalidLogin(result);

    });
  }

  getCurrentUser() {
    return sessionStorage.getItem('currentUser');
  }

  private setLoginStatus(status) {
    let credentials = { status: status };
    this.loginStatusSub.next(credentials);
  }

  getLoginStatus() {
    return this.loginStatusSub.asObservable();
  }

  validLogin(credentials) {
    console.log("VALID");
    //We have received a VALID login status from the server
    //Set the current user locally
    this.currentUser = credentials.username;
    //Set the current user in session storage for auth-guard
    sessionStorage.setItem('currentUser', this.currentUser);
    //Update observer to notify successful login
    this.setLoginStatus(credentials.status);
  }

  invalidLogin(credentials) {
    console.log("INVALID");
    //We have received and INVALID login status from the server
    //Remove session storage item to prevent issue
    if (sessionStorage.getItem('currentUser'))
      sessionStorage.removeItem('currentUser');
    //Update the observer to notify an unsuccessful login
    this.setLoginStatus(credentials.status);
  }


  logout(){
    //Remove the session storage for the current user
    sessionStorage.removeItem('currentUser');
    //Navigate to the home page
    this.router.navigate(['']);
  }
}
