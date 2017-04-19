import { Component } from '@angular/core';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Planszówkarz';
  public currentUser

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.currentUser = localStorage.getItem('currentUser');
    } else {
      this.currentUser = null;
    }
  }


}
