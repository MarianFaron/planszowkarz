import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { CoreService } from './core.service';
import { AppService } from '../app.service';
import { ExchangeService } from './../exchange/exchange.service';
import { Exchange } from './../exchange/exchange';
import { UserGame } from './../profile/user-games/user-games';
import { UserGameService } from './../profile/user-games/user-games.service';
import { UserInfoService } from './../profile/user-info/user-info.service';
import { Router, CanActivate, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
  providers: [UserGameService, UserInfoService, CoreService, AppService, ExchangeService]
})
export class CoreComponent implements OnInit {

  errorMessage: string;
  userGame: UserGame[];
  exchange: Exchange;
  currentUserGamesIds: Array<string>;
  proposeGames = [];
  selectedGames = [];

  option = {
    name: '',
    value: '',
    checked: false
  };
  options: Array<{name: string,value: string,checked: boolean}>;

  constructor(
    private http: Http, 
    private router: Router, 
    private CoreService: CoreService, 
    private appService: AppService, 
    private exchangeService: ExchangeService
  ) {}

  ngOnInit() {
    if(localStorage.getItem('currentUser')) {
      this.getCurrentUserGames();
    }
    this.getUserGame();
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
      this.CoreService.getUserGames(id)
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

  getUserGame() {
      this.CoreService.getGames()
      .subscribe(userGame => {
          this.userGame = userGame
      }, error => this.errorMessage = <any>error);
  }

  registerExchange(recipientGame: string, recipient: string){
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var sender = currentUser._id;
      this.selectedGames.push(recipientGame);

      for(var i = 0; i<this.options.length; i++) {
        if(this.options[i].checked == true) {
          this.proposeGames.push(this.options[i].value);
        }
      }

      this.exchangeService.saveExchange(this.proposeGames, this.selectedGames, sender, recipient)
        .subscribe(exchange => {
                this.exchange = exchange
        }, error => this.errorMessage = <any>error); 
          
      //clear array 
      this.selectedGames.length = 0; 
      this.proposeGames.length = 0;  
  } 
}
