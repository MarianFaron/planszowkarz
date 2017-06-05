import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { CoreService } from './core.service';
import { AppService } from '../app.service';
import { UserGame } from './../profile/user-games/user-games';
import { UserInfo } from './../profile/user-info/user-info';
import { UserGameService } from './../profile/user-games/user-games.service';
import { UserInfoService } from './../profile/user-info/user-info.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router, CanActivate, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
  providers: [UserGameService, UserInfoService, CoreService, AppService]
})
export class CoreComponent implements OnInit {

  errorMessage: string;
  userGame: UserGame[];
  userInfo: UserInfo;


  constructor(private http: Http, private router: Router, private CoreService: CoreService, private appService: AppService, private flashMessage:FlashMessagesService) {}

  ngOnInit() {
    this.getUserGame();
  }

  start(game: string, userId: string) {
    this.appService.startTransaction(game, userId)
      .subscribe(response => {
        console.log(JSON.parse(localStorage.getItem('currentUser'))._id + " send");

      });
  }

  getUserGame() {
      this.CoreService.getGames()
      .subscribe(userGame => {
          this.userGame = userGame,
          error => this.errorMessage = <any>error
      });
  }
}
