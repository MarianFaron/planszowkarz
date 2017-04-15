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
  user: User[];
  mode = 'Observable';


  constructor (private userGameService: UsersService) {}

  ngOnInit() {

  }

  login(email: string, password: string) {

    this.userGameService.login(email, password)
                     .subscribe(
                        user  => this.user,
                        error =>  this.errorMessage = <any>error);
    // location.reload();
  }

  register(login: string, email: string, password: string) {

    var user = new User({ login, email, password });

    this.userGameService.register(JSON.stringify(user))
                     .subscribe(
                        user  => this.user,
                        error =>  this.errorMessage = <any>error);
    // location.reload();
  }


}
