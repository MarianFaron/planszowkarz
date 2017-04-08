import { Component, OnInit } from '@angular/core';
import {Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserGame }              from './user-game';
import { UserGameService }       from './user-game.service';

@Component({
  selector: 'app-user-game',
  templateUrl: './user-game.component.html',
  styleUrls: ['./user-game.component.css'],
  providers: [UserGameService]
})

export class UserGameComponent implements OnInit {

  errorMessage: string;
  userGame: UserGame;
  mode = 'Observable';

  constructor (private userGameService: UserGameService) {}

  ngOnInit() { }

  addUserGame(title: string, description: string) {
    var userID = "58e45c5c9030ea1928a33fea";
    if (!title || !description) { return; }
    this.userGameService.create(title, description, userID)
                     .subscribe(
                       userGame  => userGame,
                       error =>  this.errorMessage = <any>error);
  }

  removeUserGame(id: string) {
    this.userGameService.delete(id)
                     .subscribe(
                       userGame  => userGame,
                       error =>  this.errorMessage = <any>error);
  }


}
