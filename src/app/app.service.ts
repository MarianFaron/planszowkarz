import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from './users/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { FlashMessagesService} from 'angular2-flash-messages';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class AppService {

  private rootUrl = 'http://localhost:8080';
  private usersUrl = this.getUrl('/app/users');
  private searchUrl = this.getUrl('/app/search');
  private transactionsUrl = this.getUrl('/app/start');

  public unread = 0;
  private socket = null;

  constructor (private http: Http, private flashMessage:FlashMessagesService, private notificationsService: NotificationsService) {
    if(this.isLoggedIn()) {
      this.getUnreadNotifications(this.getCurrentUser()._id);
      this.socket = io(this.getUrl(''), {query: {userId: this.getCurrentUser()._id}});
      this.getNotification();
    }
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
                      this.unread = response.json().notificationsCount;
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

  startTransaction(game: string, userId: string) {

    var currentUser = this.getCurrentUser();
    this.socket.emit('sendNotification', userId);
    this.showNotification('Powiadomienie', 'Wysłano prośbę o wymianę.', 'success');

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.transactionsUrl, {currentUser, game}, options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }

  getNotification() {
      this.socket.on('getNotification', function(data){
      this.unread++;
      this.showNotification('Powiadomienie', 'Masz nowe powiadomienie.', 'success');
    }.bind(this));
  }

  /* HELPER FUNCTIONS */

  getUrl(url: string) {
    return this.rootUrl + url;
  }

  isLoggedIn() {
    if(localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentUser() {
    if(localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  showNotification(title: string, content: string, type: string) {
    var options =   {
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 100,
          timeOut: 5000
      };

    if(type == "success") {
      this.notificationsService.success(title, content, options);
    } else if (type == "info") {
      this.notificationsService.info(title, content, options);
    } else if (type == "danger") {
      this.notificationsService.error(title, content, options);
    } else if (type == "warning") {
      this.notificationsService.warn(title, content, options);
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
