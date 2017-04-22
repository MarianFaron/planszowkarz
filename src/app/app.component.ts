import { Component } from '@angular/core';
import { UsersService }       from './users/users.service';
import { User }              from './users/user';
import { AuthGuard }              from './guards/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService, AuthGuard]
})
export class AppComponent  {

  title = 'Planszówkarz';
  currentUser;
  errorMessage: string;
  user: User[];

  constructor(private userGameService: UsersService, private authGuard: AuthGuard) {}

  logout() {
    console.log(this.authGuard.canActivate());
    this.userGameService.logout()
                        .subscribe(
                        user => this.user,
                        error => this.errorMessage = <any>error);

    localStorage.clear();
    window.location.reload();
  }

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.currentUser = localStorage.getItem('currentUser');
    } else {
      this.currentUser = null;
    }
  }


}
