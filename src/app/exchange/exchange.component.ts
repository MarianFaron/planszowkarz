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

  singleSenderGame = {
    title: '',
    gameImage: ''
  };

  senderGamesArray: Array<{title: string, gameImage: string}>;

  droppedGames = []; // tablica gier wrzuconych do kontenera drag & drop
  droppedGamesCounter = 9;
  Arr = Array; // tablica pustych elementów w kontenerze drag & drop

  // Drag & drop gry
  onGamesDrop(e: any) {
    if(this.droppedGamesCounter > 0){
      this.droppedGames.push(e.dragData);
      this.addToDragAndDrop(e.dragData, this.senderGamesArray);
      this.droppedGamesCounter -=1;
    }
  }

  // Wrzucenie gry do kontenera drag & drop
  addToDragAndDrop(item: any, list: Array<any>) {
    let index = list.map(function (e) {
      return e.title
    }).indexOf(item.title);
    list.splice(index, 1);
  }

  // Usunięcie gry z kontenera drag & drop
  removeFromDragAndDrop(title: string, gameImage: string){
    this.droppedGamesCounter +=1;
    var singleSenderGame = {
      title: title,
      gameImage: gameImage
    }
    this.senderGamesArray.push(singleSenderGame);
    this.droppedGames = this.droppedGames.filter(singleSenderGame => singleSenderGame.title !== title);
  }

  errorMessage: string;
  status: string;
  exchange: Exchange;

  recipientGame: UserGame;
  recipientInfo: UserInfo;
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
      this.getSenderUserGames();
    }
    this.getRecipientUserGame();  }

  // Pobierz gry nadawcy
  getSenderUserGames() {
    var id = this.appService.getCurrentUser()._id;
    this.exchangeService.getSenderGames(id)
                        .subscribe(
                            senderGames => {
                              this.senderGamesArray = [];

                              for (var i =0; i < senderGames.length; i++) {
                                var singleSenderGame = {
                                  title: senderGames[i].title,
                                  gameImage: senderGames[i].Image
                                }
                                this.senderGamesArray.push(singleSenderGame);
                              }
                          },
                          error => this.errorMessage = <any>error);
    this.getSenderUserInfo();
  }

  // Pobierz dane nadawcy
  getSenderUserInfo(){
    var id = this.appService.getCurrentUser()._id;
    this.userInfoService.getUser(id)
                        .subscribe(
                            userInfo => {
                              this.senderInfo = userInfo;
                          },
                          error => this.errorMessage = <any>error);
  }

  // Pobierz grę odbiorcy
  getRecipientUserGame(){
    let gameID = this.activeRoute.snapshot.params['_id'];
    this.exchangeService.getRecipientGame(gameID)
                        .subscribe(
                            recipientGame => {
                              this.recipientGame = recipientGame;
                              this.getRecipientUserInfo(recipientGame.userID._id);
                            },
                            error => this.errorMessage = <any>error);
  }

  // Pobierz dane odbiorcy
  getRecipientUserInfo(id: string){
    this.userInfoService.getUser(id)
                        .subscribe(
                            userInfo => {
                              this.recipientInfo = userInfo;
                          },
                          error => this.errorMessage = <any>error);
  }

  // Proces wymiany
  saveExchange(recipientGame: string, recipientGameId: string, recipient: string, sender: string){
    if(this.droppedGames.length == 0){
      this.appService.showNotification('Powiadomienie', 'Wybierz co najmniej jedną swoją grę', 'danger');
    }
    else{
      var proposeGames = [];
      for (var i =0; i < this.droppedGames.length; i++) {
        proposeGames.push(this.droppedGames[i].title);
      }
      
      // Rejestracja wymiany
      this.exchangeService.saveExchange(proposeGames, recipientGameId, sender, recipient)
                          .subscribe(
                              exchange => {
                                  this.exchange = exchange
                              }, error => this.errorMessage = <any>error); 
       
      //Wysłanie powiadomienia
      this.appService.startTransaction(recipientGame, recipient, proposeGames).subscribe();
      proposeGames.length = 0; 
    }
  }
}