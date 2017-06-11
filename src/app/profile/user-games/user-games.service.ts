import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";

import { UserGame } from './user-games';
import { UserInfo } from '../user-info/user-info';

@Injectable()
export class UserGameService {

  private userGameUrl = this.appService.getUrl('/app/userGames');
  private userUrl = this.appService.getUrl('/app/users');  
  private editUserUrl = this.appService.getUrl('/app/edit-user');
  

  constructor (private http: Http, private appService: AppService) {}


  // Create user game
  create(title: string, category: string, state: string, description: string, createdDate: string, userID: string, Image: string): Observable<UserGame[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.userGameUrl, { title, category, state, description, createdDate, userID, Image }, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
  }

  // Update user game
  update(id: string, title: string, category: string, state: string, description: string, modifiedDate: string, Image: string): Observable<UserGame[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.patch(`${this.userGameUrl}/${id}`, {title, category, state, description, modifiedDate, Image}, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
  }

  // Delete user game
  delete(id: string): Observable<UserGame[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${this.userGameUrl}/${id}`, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
  }

  // Get user games
  getGames(id: string): Observable<UserGame[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.userUrl}/${id}/userGames`, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
  }

  // Upfate number of user games
  updateUserNumberOfGames(id: string, numberOfGames: number): Observable<UserInfo[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log("serwis + " + numberOfGames);

    return this.http.post(`${this.editUserUrl}/${id}`, {numberOfGames}, options)
                  .map(this.appService.extractData)
                  .catch(this.appService.handleError);
  }
}
