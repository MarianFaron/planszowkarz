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
  public user: User;
  mode = 'Observable';

  model = {
      login: '',
      email: '',
      password: ''
    };

  constructor(private userGameService: UsersService, private flashMessage:FlashMessagesService) { }

  ngOnInit() {}

  forgotPassword(email: string) {
    this.userGameService.forgotPassword(email)
                        .subscribe(response => {
                          this.flashMessage.show("Wysłano nowe hasło.", {cssClass: 'alert-danger', timeout: 3000});
                        });
  }

  fbLogin() {
    this.userGameService.fbLogin()
                        .subscribe(
                          user => {
                            console.log(this.user);
                            this.user;
                            window.location.replace('/user-game');
                          },
                          error => this.errorMessage = <any>error);
  }

  login(email: string, password: string) {

     this.userGameService.login(email, password)
                        .map((response) => {
                          if(response.message) {
                            this.flashMessage.show(response.message.toString(), {cssClass: 'alert-danger', timeout: 3000});
                          } else if(response.user) {
                             window.location.replace('/user-game');
                          }
                        })
                        .subscribe(user => this.user, error => this.errorMessage = <any>error);

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
                        .map((response) => {
                          if(response.message) {
                            this.flashMessage.show(response.message.toString(), {cssClass: 'alert-danger', timeout: 3000});
                          } else if(response.user) {
                            this.flashMessage.show("E-mail aktywacyjny został wysłany. Sprawdź swoją pocztę.", {cssClass: 'alert-success', timeout: 3000});
                          }
                        })
                        .subscribe(user => this.user, error => this.errorMessage = <any>error);
  }


}
