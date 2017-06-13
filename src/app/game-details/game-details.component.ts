import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { GameDetails } from './game-details';
import { AppService } from '../app.service';
import { GameDetailsService } from './game-details.service';
import { CoreService } from '../core/core.service';
import { ActivatedRoute } from '@angular/router';
import { ExchangeService } from './../exchange/exchange.service';
import { Exchange } from './../exchange/exchange';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  providers: [GameDetailsService, AppService, ExchangeService, CoreService]
})
export class GameDetailsComponent implements OnInit {

  errorMessage: string;
  status: string;
  gameDetails: GameDetails;

  // EXCHANGE
  exchange: Exchange;
  proposeGames = [];

  currentUserGamesIds: Array<string>;

  option = {
    name: '',
    value: '',
    checked: false
  };
  options: Array<{name: string,value: string,checked: boolean}>;

  constructor(
    private http: Http,
    private gameDetailsService: GameDetailsService,
    private appService: AppService,
    private activeRoute: ActivatedRoute,
    private exchangeService: ExchangeService,
    private coreService: CoreService
  ) {}

  ngOnInit() {

    let id = this.activeRoute.snapshot.params['_id'];

    this.gameDetailsService.getGame(id)
                           .subscribe(
                             gameDetails => this.gameDetails = gameDetails,
                             error => this.errorMessage = <any>error
                           );

     if(localStorage.getItem('currentUser')) {
       this.getCurrentUserGames();
     }
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
}
