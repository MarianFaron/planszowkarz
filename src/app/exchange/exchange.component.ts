import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { CoreService } from '../core/core.service';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { ExchangeService } from './../exchange/exchange.service';
import { Exchange } from './../exchange/exchange';
import { UserGameService } from './../profile/user-games/user-games.service';
import { UserGame } from './../profile/user-games/user-games';
import { UserInfoService } from './../profile/user-info/user-info.service';
import { UserInfo } from './../profile/user-info/user-info';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  providers: [AppService, CoreService, ExchangeService, UserInfoService]
})

export class ExchangeComponent implements OnInit {

  errorMessage: string;
  status: string;
  recipientGame: UserGame;  
  senderGames: UserGame[];
  senderInfo: UserInfo;

  constructor(
    private http: Http,
    private appService: AppService,
    private activeRoute: ActivatedRoute,
    private exchangeService: ExchangeService,
    private coreService: CoreService,
    private userInfoService: UserInfoService
  ) {}

  ngOnInit() {
  	if(localStorage.getItem('currentUser')) {
      this.getCurrentUserGames();
      this.getCurrentUserInfo();
    }

  	// Pobierz grę odbiorcy
    let id = this.activeRoute.snapshot.params['_id'];
    this.exchangeService.getRecipientGame(id)
                        .subscribe(
                            recipientGame => {
                            	this.recipientGame = recipientGame;
                            },
                            error => this.errorMessage = <any>error);
  }

  // Pobierz gry nadawcy
  getCurrentUserGames() {
    var id = this.appService.getCurrentUser()._id;
    this.exchangeService.getSenderGames(id)
                        .subscribe(
                            senderGames => {
                            	this.senderGames = senderGames;
                        	},
                        	error => this.errorMessage = <any>error);
  }

  // Pobierz dane nadawcy
  getCurrentUserInfo(){
    var id = this.appService.getCurrentUser()._id;

    this.userInfoService.getUser(id)
                        .subscribe(
                            userInfo => {
                          		this.senderInfo = userInfo;
                        	},
                        	error => this.errorMessage = <any>error);
  }
}
