import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/do";

import { Message } from './messages';

@Injectable()
export class ChatService {

    private chatUrl = this.appService.getUrl('/app/chat');

    constructor (private http: Http, private appService: AppService) {}

    startChat(sender: string, recipient: string) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.chatUrl, {sender, recipient}, options)
                      .map(this.appService.extractData)
                      .catch(this.appService.handleError);
    }

    getChat(chatId: string) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.get(`${this.chatUrl}/${chatId}`, options)
                      .map(this.appService.extractData)
                      .catch(this.appService.handleError);
    }

    getChatFriend(id: string) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.get(`${this.appService.getUrl('/app/users')}/${id}`, options)
                      .map(this.appService.extractData)
                      .catch(this.appService.handleError);
    }

    getMessages(chatId: string): Observable<Message[]>{
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.get(`${this.chatUrl}/${chatId}/messages`, options)
                      .map(this.appService.extractData)
                      .catch(this.appService.handleError);
    }

    sendMessage(chat: string, sender: string, recipient: string, content: string) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      
      return this.http.post(`${this.chatUrl}/${chat}/messages`, {chat, sender, recipient, content }, options)
                      .map(this.appService.extractData)
                      .catch(this.appService.handleError);
    }
}
