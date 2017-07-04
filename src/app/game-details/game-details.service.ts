import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";

import { GameDetails } from './game-details';

@Injectable()
export class GameDetailsService {

  constructor (private http: Http, private appService: AppService) {}

  private userGameUrl = this.appService.getUrl('/app/userGames');

  getGame(id: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.userGameUrl}/${id}`, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
  }
}