import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss']
})
export class UserNavbarComponent implements OnInit {

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
