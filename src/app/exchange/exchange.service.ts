import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";

import { Exchange } from './exchange';
import { UserGame } from './../profile/user-games/user-games';

@Injectable()
export class ExchangeService {

	private exchangeUrl = this.appService.getUrl('/app/exchanges');
	private userGameUrl = this.appService.getUrl('/app/userGames');
  private userGamesUrl = this.appService.getUrl('/app/users');

    constructor (private http: Http, private appService: AppService) {}

    saveExchange(proposeGames: string[], recipientGame: string, sender: string, recipient: string){
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.exchangeUrl, {proposeGames, recipientGame, sender, recipient}, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
    }

		closeExchange(chatId: string, userId: string) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(`${this.exchangeUrl}/close`, {chatId, userId}, options)
                      .map(this.appService.extractData)
                      .catch(this.appService.handleError);
    }

    getRecipientGame(id: string) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.get(`${this.userGameUrl}/${id}`, options)
                      .map(this.appService.extractData)
                      .catch(this.appService.handleError);
    }

    getSenderGames(id: string): Observable<UserGame[]>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.get(`${this.userGamesUrl}/${id}/userGames`, options)
                      .map(this.appService.extractData)
                      .catch(this.appService.handleError);
    }
}
