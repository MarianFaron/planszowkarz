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
  loading: boolean = true;

  constructor(private http: Http, private router: Router, private CoreService: CoreService, private appService: AppService, private flashMessage:FlashMessagesService) {}

  ngOnInit() {
    this.getUserGame();
  }

  start(game: string) {
    this.appService.startTransaction(game)
      .subscribe(response => {
        this.flashMessage.show("Wysłano prośbę o wymianę.", {cssClass: 'alert-success', timeout: 3000});
      });
  }

  getUserGame() {
      this.CoreService.getGames()
                          .subscribe(
                                userGame => {
                                    this.userGame = userGame.reverse(),
                                    error => this.errorMessage = <any>error
                                }
                          );
  }
}
