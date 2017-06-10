import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";

import { Exchange } from './exchange';

@Injectable()
export class ExchangeService {

	private exchangeUrl = this.appService.getUrl('/app/exchanges');

    constructor (private http: Http, private appService: AppService) {}

    saveExchange(proposeGames: string[], selectedGames: string[], sender: string, recipient: string){
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.exchangeUrl, {proposeGames, selectedGames, sender, recipient}, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
    }
}
