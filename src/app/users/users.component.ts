import { Component, OnInit } from '@angular/core';
import { User }              from './user';
import { UsersService }       from './users.service';
import { AppService }       from '../app.service';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css', '../app.scss'],
  providers: [AppService, UsersService]
})
export class UsersComponent implements OnInit {

  errorMessage: string;
  public user: User;
  public allUsers: any[];
  mode = 'Observable';
  userlogin = '';
  loginIsUsed: Boolean = false;
  avatarImgName = "default.png"

  model = {
      login: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

  constructor(private appService: AppService, private userGameService: UsersService, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userGameService.getUsers()
                      .subscribe(allUsers => {this.allUsers = allUsers;},
                                error => {this.errorMessage = <any>error;}
                      );
  }


  usedLogin(event: any) {
    for(var i=0; i<this.allUsers.length; i++){
      if(this.allUsers[i].local != undefined) {
        if(this.allUsers[i].local.login.toLowerCase() == event.target.value.toLowerCase()) {
          this.loginIsUsed = true;
          this.userlogin = event.target.value;
          return;
        } else {
          this.loginIsUsed = false;
        }
      }
    }
  }

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
                            this.user;
                            window.location.replace('/profile');
                          },
                          error => this.errorMessage = <any>error);
  }

  login(email: string, password: string) {

     this.userGameService.login(email, password)
                        .map((response) => {
                          if(response.message) {
                            this.flashMessage.show(response.message.toString(), {cssClass: 'alert-danger', timeout: 3000});
                          } else if(response.user) {
                             window.location.replace('/profile');
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

  register(login: string, email: string, password: string, avatarImage: string) {

    this.userGameService.register(login, email, password, this.avatarImgName)
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
