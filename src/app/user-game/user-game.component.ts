import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserGame }              from './user-game';
import { UserGameService }       from './user-game.service';
import { FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-user-game',
  templateUrl: './user-game.component.html',
  styleUrls: ['./user-game.component.css'],
  providers: [UserGameService]
})

export class UserGameComponent implements OnInit {

  errorMessage: string;
  userGame: UserGame[];
  mode = 'Observable';

  addNewGameBtnClicked = false;

  constructor (private userGameService: UserGameService, private flashMessage:FlashMessagesService) {}

  ngOnInit() {
    this.getUserGame();
  }

  addUserGame(title: string, category: string, state: string, description: string) {
    var userID = "58e45c5c9030ea1928a33fea";
    if (!title || !description || !category || !state) { return; }
    this.userGameService.create(title, category, state, description, userID)
                     .subscribe(
                        userGame  => this.userGame,
                        error =>  this.errorMessage = <any>error);

    this.flashMessage.show('Successful add new game', {cssClass: 'alert-success', timeout: 3000});
    this.getUserGame();
  }
  

  editUserGame(id: string, title: string, category: string, state: string, description: string) {
    this.userGameService.update(id, title, category, state, description)
                     .subscribe(
                        userGame  => this.userGame,
                        error =>  this.errorMessage = <any>error);

    this.flashMessage.show('Successful edit game', {cssClass: 'alert-success', timeout: 3000});
    this.getUserGame();
  }

  removeUserGame(id: string) {
    this.userGameService.delete(id)
                     .subscribe(
                        userGame  => this.userGame,
                        error =>  this.errorMessage = <any>error);

    this.flashMessage.show('Successful delete game', {cssClass: 'alert-success', timeout: 3000});
    this.getUserGame();
  }

  getUserGame(){
    var userID = "58e45c5c9030ea1928a33fea";
    this.userGameService.getGames(userID)
                      .subscribe(
                        userGame => this.userGame = userGame.reverse(),
                        error => this.errorMessage = <any>error);
  }
}
