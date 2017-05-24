import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { UserInfo } from './user-info';

@Injectable()
export class UserInfoService {

	private userInfoURL = this.appService.getUrl('/app/users');
	private editUserUrl = this.appService.getUrl('/app/edit-user');

	constructor (private http: Http, private appService: AppService) {}

	// get information about one user
	getUser(id: string): Observable<UserInfo> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.userInfoURL}/${id}`, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
	}

	// edit information about one user
	updateUser(id: string, dateBirth: string, city: string, contactNumber: string, avatarImage: string, password): Observable<UserInfo[]> {
		let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.editUserUrl}/${id}`, {dateBirth, city, contactNumber, avatarImage, password}, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
	}

}
