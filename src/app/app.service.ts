import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from './users/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {

  private rootUrl = 'http://planszowkarz.herokuapp.com';
  private usersUrl = this.getUrl('/app/users');
  private searchUrl = this.getUrl('/app/search');
  private transactionsUrl = this.getUrl('/app/start');;

  constructor (private http: Http) {}

  getUrl(url: string) {
    return this.rootUrl + url;
  }

  getUser(id: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.getUrl('/app/users')}/${id}`, options)
                    .map((response: Response) => {
                      localStorage.setItem('currentUser', JSON.stringify(response.json()));
                    })
                    .catch(this.handleError);
  }

  getUnreadNotifications(userId: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var url = this.getUrl('/app/'+userId+'/unread-notifications');

    return this.http.get(url, options)
                    .map((response: Response) => {
                      localStorage.setItem('notificationsCount', JSON.stringify(response.json().notificationsCount));
                    })
                    .catch(this.handleError);
  }

  search(query: Object) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.searchUrl, {query}, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  startTransaction(game: string) {

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.transactionsUrl, {currentUser, game}, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }

  isLoggedIn() {
    if(localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }

  extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  handleError (error: Response | any) {
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
