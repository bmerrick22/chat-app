import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  animation: boolean;
  constructor() { }

  ngOnInit(): void {
      //Run the animation for home screen
      this.loadAnimation();
   }

  ngAfterViewInit(): void {
  }

  loadAnimation(){
    if(sessionStorage.getItem('visited')){
      this.animation = false;
    }else{
      this.animation = true;
      sessionStorage.setItem('visited', 'true')
    }

  }

}
