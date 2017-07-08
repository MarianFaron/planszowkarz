import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { UserInfo } from './../profile/user-info/user-info';
import { UserGame } from './../profile/user-games/user-games';


@Injectable()
export class OtherUserService {

    private userInfoURL = this.appService.getUrl('/app/users/login');
    private userUrl = this.appService.getUrl('/app/users');

    constructor (private http: Http, private appService: AppService) {}

    getUserInfo(login: string): Observable<UserInfo> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(`${this.userInfoURL}/${login}`, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
    }

    getUserGames(id: string): Observable<UserGame[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.userUrl}/${id}/userGames`, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
  }

}