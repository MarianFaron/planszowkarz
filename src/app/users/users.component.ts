import { Component, OnInit } from '@angular/core';
import { User }              from './users';
import { UsersService }       from './users.service';
import { UserConfigService }       from '../profile/user-config/user-config.service';
import { AppService }       from '../app.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../app.component.scss'],
  providers: [AppService, UsersService, UserConfigService]
})
export class UsersComponent implements OnInit {

  errorMessage: string;
  public user: User;
  public allUsers: any[];
  mode = 'Observable';
  userlogin = '';
  loginIsUsed: Boolean = false;
  private sub: any;


  model = {
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatarImage: 'default.png'
    };

  constructor(private appService: AppService, private userConfigService: UserConfigService, private userGameService: UsersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {

      var userId = params['success'];
      if(userId) {
        var user = this.appService.getUser(userId).subscribe(user => {
          if (!user.isVerified) {
            this.userConfigService.updateUser(
              user._id, user.dateBirth, user.city, user.contactNumber, user.avatarImage, '', user.numberOfGames, user.numberOfExchanges, user.numberOfRatings, user.sumOfGrades, user.isVerified
            ).subscribe(
              user => {
                this.appService.showNotification('Powiadomienie', 'Pomyślnie zarejestrowano użytkownika.', 'success');
              }, error => {this.errorMessage = <any>error;});
          }
        });
      }
    });
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
                          this.appService.showNotification('Powiadomienie', 'Wysłano nowe hasło.', 'success');
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
                            this.appService.showNotification('Powiadomienie', response.message.toString(), 'danger');
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

  register(login: string, email: string, password: string, avatarImage: string, registerForm: any) {

    this.userGameService.register(login, email, password, avatarImage)
                        .map((response) => {
                          if(response.message) {
                            this.appService.showNotification('Powiadomienie', response.message.toString(), 'danger');
                          } else if(response.user) {
                            this.appService.showNotification('Powiadomienie', "E-mail aktywacyjny został wysłany.", 'success');
                            registerForm.reset();
                          }

                        })
                        .subscribe(user => this.user, error => this.errorMessage = <any>error);
  }


}
