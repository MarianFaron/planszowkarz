import { Component, OnInit } from '@angular/core';
import { User }              from './user';
import { UsersService }       from './users.service';

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
  constructor(private userGameService: UsersService) { }

  ngOnInit() { 
    
  }

  login(email: string, password: string) {

    this.userGameService.login(email, password)
                        .subscribe(
                        user => {
                          this.user;
                          window.location.reload();
                        },
                        error => this.errorMessage = <any>error);

  }

  logout() {

    this.userGameService.logout()
                        .subscribe(
                        user => this.user,
                        error => this.errorMessage = <any>error);
                        
    localStorage.clear();
    window.location.reload();
  }

  register(login: string, email: string, password: string) {

    this.userGameService.register(login, email, password)
                        .subscribe(
                        user => this.user,
                        error => this.errorMessage = <any>error);
  }


}
