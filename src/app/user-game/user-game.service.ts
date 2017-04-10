import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { UserGame } from './user-game';

@Injectable()
export class UserGameService {

  private userGameUrl = 'http://localhost:8080/app/userGames';
  private userUrl = 'http://localhost:8080/app/users';

  constructor (private http: Http) {}

  // Create user game

  create(title: string, description: string, userID: string): Observable<UserGame> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.userGameUrl, { title, description, userID }, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Update user game

  update(id: string, title: string, description: string): Observable<UserGame[]> {

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.patch(`${this.userGameUrl}/${id}`, {title, description}, options)
                      .map(this.extractData)
                      .catch(this.handleError);
  }

  // Delete user game

  delete(id: string): Observable<UserGame> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${this.userGameUrl}/${id}`, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Get user games

  getGames(id: string): Observable<UserGame>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.userUrl}/${id}/userGames`, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }  

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
