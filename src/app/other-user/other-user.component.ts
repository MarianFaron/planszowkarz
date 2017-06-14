import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { OtherUserService } from './other-user.service';
import { AppService } from '../app.service';
import { CoreService } from '../core/core.service';
import { OtherUser } from './other-user';
import { ActivatedRoute } from '@angular/router';
import { UserGame } from '../profile/user-games/user-games';
import { ExchangeService } from './../exchange/exchange.service';
import { Exchange } from './../exchange/exchange';


@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.scss'],
  providers: [OtherUserService, AppService, CoreService, ExchangeService]
})

export class OtherUserComponent implements OnInit {

  errorMessage: string;
  status: string;
  userInfo: OtherUser[];
  userGame: UserGame[];
  userID: string;
  currentUserGamesIds: Array<string>;

  // EXCHANGE
  exchange: Exchange;
  proposeGames = [];

  option = {
    name: '',
    value: '',
    checked: false
  };
  options: Array<{name: string,value: string,checked: boolean}>;


  constructor( 
    private http: Http,
    private otherUserService: OtherUserService,
    private appService: AppService,
    private coreService: CoreService,
    private activeRoute: ActivatedRoute,
    private exchangeService: ExchangeService
  ) {}


  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.getCurrentUserGames();
    }
    let login = this.activeRoute.snapshot.params['login'];
    this.getUserInfo(login);
  }

  getUserInfo(login: string) {
    this.otherUserService.getUser(login)
                     .subscribe(
                        userInfo => {
                          this.userInfo = userInfo;
                          this.getUserID(userInfo);
                        },
                        error => this.errorMessage = <any>error);
  }

  getUserID(userInfo: any){
    this.getUserGame(userInfo._id);
  }

  getUserGame(id: string) {
    this.otherUserService.getGames(id)
      .subscribe(
                  userGame => this.userGame = userGame.reverse(),
                  error => this.errorMessage = <any>error);
  }

  start(game: string, userId: string) {
    this.currentUserGamesIds = [];
    for(var i = 0; i<this.options.length; i++) {
      if(this.options[i].checked == true) {
        this.currentUserGamesIds.push(this.options[i].value);
      }
    }

    this.appService.startTransaction(game, userId, this.currentUserGamesIds)
      .subscribe(response => {
        console.log(JSON.parse(localStorage.getItem('currentUser'))._id + " send");
        
      });
  }

  getCurrentUserGames() {
      var id = this.appService.getCurrentUser()._id;
      this.coreService.getUserGames(id)
      .subscribe(userGames => {
          this.options = [];

          for (var i =0; i< userGames.length; i++) {
            var option = {
              name: userGames[i].title,
              value: userGames[i].title,
              checked: false
            }
            this.options.push(option);
          }
      }, error => this.errorMessage = <any>error);
  }

  registerExchange(recipientGames: string, recipient: string){
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var sender = currentUser._id;
      var recipientGame = recipientGames;

      for(var i = 0; i<this.options.length; i++) {
        if(this.options[i].checked == true) {
          this.proposeGames.push(this.options[i].value);
        }
      }

      this.exchangeService.saveExchange(this.proposeGames, recipientGame, sender, recipient)
        .subscribe(exchange => {
                this.exchange = exchange
        }, error => this.errorMessage = <any>error); 
          
      //clear array  
      this.proposeGames.length = 0;  
  } 
}
