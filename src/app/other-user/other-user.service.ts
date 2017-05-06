import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { OtherUser } from './other-user';
import { UserGame } from '../user-profile/user-games/user-games';


@Injectable()
export class OtherUserService {

	private userInfoURL = 'http://localhost:8080/app/users';
	private userGameUrl = 'http://localhost:8080/app/userGames';

	constructor (private http: Http) {}

	// get information about one user
	getUser(id: string): Observable<OtherUser[]> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

    	return this.http.get(`${this.userInfoURL}/${id}`, options)
                    .map(this.extractData)
                    .catch(this.handleError);
	}

	getGames(id: string): Observable<UserGame[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.userInfoURL}/${id}/userGames`, options)
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