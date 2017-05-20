import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { OtherUser } from './other-user';
import { UserGame } from '../profile/user-games/user-games';


@Injectable()
export class OtherUserService {

	private userInfoURL = this.appService.getUrl('/app/users');
	private userGameUrl = this.appService.getUrl('/app/userGames');

	constructor (private http: Http, private appService: AppService) {}

	// get information about one user
	getUser(id: string): Observable<OtherUser[]> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

    	return this.http.get(`${this.userInfoURL}/${id}`, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
	}

	getGames(id: string): Observable<UserGame[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.userInfoURL}/${id}/userGames`, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
  }

}
