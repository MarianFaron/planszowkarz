import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { CoreService } from './core.service';
import { AppService } from '../app.service';
import { UserGame } from './../profile/user-games/user-games';
import { UserInfo } from './../profile/user-info/user-info';
import { UserGameService } from './../profile/user-games/user-games.service';
import { UserInfoService } from './../profile/user-info/user-info.service';

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
  userGameIdArray: string[];
  userNameArray: string[] = [];

  constructor(private http: Http,  private CoreService: CoreService, private appService: AppService) {

  }

  ngOnInit() {
    this.getUserGame();
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
