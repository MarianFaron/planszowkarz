import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  notificationsCount() {
    if(localStorage.getItem('notificationsCount') != null) {
      return localStorage.getItem('notificationsCount');
    } else {
      return null;
    }

  }

  constructor() { }

  ngOnInit() {
  }

}
