import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";

import { UserGame } from './../profile/user-games/user-games';
import { UserInfo } from './../profile/user-info/user-info';

@Injectable()
export class CoreService {

    private userGameUrl = this.appService.getUrl('/app/userGames');
    private userInfoURL = this.appService.getUrl('/app/users');

    constructor (private http: Http, private appService: AppService) {}

    getGames(): Observable<UserGame[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.userGameUrl, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
    }
}
