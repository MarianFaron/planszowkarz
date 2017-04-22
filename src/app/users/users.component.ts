import { Component, OnInit } from '@angular/core';
import { User }              from './user';
import { UsersService }       from './users.service';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UsersService]
})
export class UsersComponent implements OnInit {

  errorMessage: string;
  user: User[];
  mode = 'Observable';

  constructor(private userGameService: UsersService, private flashMessage:FlashMessagesService) { }

  ngOnInit() { }

  test() {
    console.log("test");
  }

  login(email: string, password: string) {

    this.userGameService.login(email, password)
                        .subscribe(
                        user => {
                          this.user;
                          window.location.replace('/user-game');                  
                        },
                        error => this.errorMessage = <any>error);

  }

  logout() {

    this.userGameService.logout()
                        .subscribe(
                        user => {
                          this.user;
                          localStorage.clear();
                          window.location.reload();
                        },
                        error => this.errorMessage = <any>error);

  }

  register(login: string, email: string, password: string) {

    this.userGameService.register(login, email, password)
                        .subscribe(
                        user => {
                          this.user;
                          this.flashMessage.show('Zarejestrowano nowego użytkownika.', {cssClass: 'alert-success', timeout: 3000});
                        },
                        error => this.errorMessage = <any>error);
  }


}
