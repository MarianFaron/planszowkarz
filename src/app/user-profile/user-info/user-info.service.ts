import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { UserInfo } from './user-info';

@Injectable()
export class UserInfoService {

	private userInfoURL = 'http://localhost:8080/app/users';

	constructor (private http: Http) {}

	// get information about one user
	getUser(id: string): Observable<UserInfo> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

    	return this.http.get(`${this.userInfoURL}/${id}`, options)
                    .map(this.extractData)
                    .catch(this.handleError);
	}

	// edit information about one user

	updateUser(id: string, login: string, surName: string, dateBirth: string, city: string, contactNumber: string, avatarImage: string): Observable<UserInfo[]> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

    	return this.http.patch(`${this.userInfoURL}/${id}`, {login, surName, dateBirth, city, contactNumber, avatarImage}, options)
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
