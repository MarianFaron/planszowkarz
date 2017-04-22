import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class UsersService {

  private userRegisterUrl = 'http://localhost:8080/app/users/register';
  private userLoginUrl = 'http://localhost:8080/app/users/login';
  private userLogoutUrl = 'http://localhost:8080/app/users/logout';

  constructor (private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  // Login user

  login(email: string, password: string): Observable<User[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.userLoginUrl, {email, password}, options)
                    .map((response: Response) => {
                        // console.log(response.json().user);
                        if (response.json().user) {
                            localStorage.setItem('currentUser', JSON.stringify(response.json().user));
                            return true;
                        } else {
                            return false;
                        }
                    })
                    .catch(this.handleError);

  }

  // Logout user

  logout(): Observable<User[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.userLogoutUrl, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // Register user

  register(login: string, email: string, password: string): Observable<User[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.userRegisterUrl, {login, email, password}  , options)
                    .map((response: Response) => {
                        if (response.json().user) {
                            localStorage.setItem('currentUser', JSON.stringify(response.json().user));
                            return true;
                        } else {
                            return false;
                        }
                    })
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
