import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";

import { ContactMessage } from './contact-message'

@Injectable()
export class ContactService {

  private contactUrl = this.appService.getUrl('/app/contact');

  constructor (private http: Http, private appService: AppService) {}

  registerApplication(subject: string, content: string, authorEmail: string, authorName: string, authorSurname: string): Observable<ContactService>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.contactUrl, { subject, content, authorEmail, authorName, authorSurname}, options)
    .map(this.appService.extractData)
    .catch(this.appService.handleError);
  }
}
