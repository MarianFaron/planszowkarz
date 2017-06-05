import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";


@Injectable()
export class UserNotificationsService {

  private notificationsUrl = this.appService.getUrl('/app/notifications');
  private changeStatusUrl = this.appService.getUrl('/app/change-status');

  constructor (private http: Http, private appService: AppService) {}

  changeStatus(id: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${this.changeStatusUrl}/${id}`, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
  }

  getNotifications(userId: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    var url = this.appService.getUrl('/app/'+userId+'/notifications');

    return this.http.get(url, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
  }

  deleteNotification(id: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${this.notificationsUrl}/${id}`, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
  }

}
