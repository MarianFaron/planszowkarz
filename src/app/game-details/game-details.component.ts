import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { GameDetails } from './game-details';
import { AppService } from '../app.service';
import { GameDetailsService } from './game-details.service';
import { ActivatedRoute } from '@angular/router';
import { ExchangeService } from './../exchange/exchange.service';
import { Exchange } from './../exchange/exchange';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  providers: [GameDetailsService, AppService, ExchangeService]
})
export class GameDetailsComponent implements OnInit {

  errorMessage: string;
  status: string;
  gameDetails: GameDetails;

  // EXCHANGE
  exchange: Exchange;
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
    private gameDetailsService: GameDetailsService,
    private appService: AppService,
    private activeRoute: ActivatedRoute,
    private exchangeService: ExchangeService
  ) {}

  ngOnInit() {

    let id = this.activeRoute.snapshot.params['_id'];

    this.gameDetailsService.getGame(id)
                           .subscribe(
                             gameDetails => this.gameDetails = gameDetails,
                             error => this.errorMessage = <any>error
                           );
   }

   registerExchange(recipientGame: string, recipient: string){
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var sender = currentUser._id;
      this.selectedGames.push(recipientGame);

      for(var i = 0; i<this.options.length; i++) {
        if(this.options[i].checked == true) {
          /* this.proposeGames.push(this.options[i].value)   // nazwy gier zaznaczone checkboxami    */ 
        }
      }
      this.proposeGames.push('59235fdc02007736fcee6062');

      this.exchangeService.saveExchange(this.proposeGames, this.selectedGames, sender, recipient)
        .subscribe(exchange => {
                this.exchange = exchange
        }, error => this.errorMessage = <any>error); 
          
      //clear array 
      this.selectedGames.length = 0; 
      this.proposeGames.length = 0;  
  }
}