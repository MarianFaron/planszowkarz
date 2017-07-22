import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppService } from '../../app.service';
import { UserHistoryService } from './user-history.service';
import { UserHistoryComponent } from './user-history.component';
import { NotificationsService } from 'angular2-notifications';

describe('UserHistoryComponent', () => {
  let component: UserHistoryComponent;
  let fixture: ComponentFixture<UserHistoryComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistoryComponent ],
      imports: [ 
          RouterTestingModule
                  .withRoutes([
                    {
                        path: 'history',
                        component: UserHistoryComponent
                    }
                ]), 
      ]
    })
    .compileComponents();
  });
});

describe('UserHistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        UserHistoryService,
        NotificationsService,
        AppService
      ]
    });
  });
  describe('Feature that retrieves data about user exchange history', () => {
    it('Success request for user exchange history', async(inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '594a5c96d42c9038c46b25b9';
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges/' + id);
        expect(connection.request.method).toBe(RequestMethod.Get);
        //expect(connection.request.text()).toEqual(JSON.stringify('594a5c96d42c9038c46b25b9'));
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: [
              {
                "_id": "5960f5f65ca8a419a8f7961f",
                "recipientGame": {
                    "_id": "595d98fa09049010143e139c",
                    "title": "mkvmkdmvkdmv",
                    "category": "Strategiczna",
                    "state": "Nowa",
                    "userID": "594d750e23e60c0de45af913"
                },
                "sender": {
                    "_id": "594a5c96d42c9038c46b25b9",
                    "local": {
                        "email": "kamil.wojcik.525@gmail.com",
                        "login": "magic"
                    }
                },
                "recipient": {
                    "_id": "594d750e23e60c0de45af913",
                    "local": {
                        "email": "1981600428739713",
                        "login": "1981600428739713"
                    }
                },
                "date": "2017-07-08T15:10:46.633Z",
                "status": "pending",
                "proposeGames": [
                    "Alchemicy",
                    "xsxs",
                    "sfsffsfsfssffssf",
                    "dsds"
                ]
            }
          ]
        })));
      });
      userhistoryservice.getHistoryExchanges('594a5c96d42c9038c46b25b9').subscribe((response) => {
        expect(response.length).toEqual(1);
        expect(response[0].recipientGame._id).toBe('595d98fa09049010143e139c');
        expect(response[0].sender.local.login).toBe('magic');
        expect(response[0].recipient.local.email).toBe('1981600428739713');
        expect(response[0].status).toBe('pending');
      });
    })));
    it('Fail request for user exchange history', async(inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
       mockbackend.connections.subscribe((connection) => {
        var id = '594a5c96d42c9038c46b25b9';
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges/' + id);
        expect(connection.request.method).toBe(RequestMethod.Get);
        //expect(connection.request.text()).toEqual(JSON.stringify('594a5c96d42c9038c46b25b9'));
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: { message: 'Error' }
        })));
      });
      userhistoryservice.getHistoryExchanges('594a5c96d42c9038c46b25b9').subscribe((response) => {
        expect(response.message).toEqual('Error');
      });
    })));
  });
  describe('Feature that retrieves the history of user sended requests', () => {
    it('Success retrieving the history of sent requests', async(inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '594a5c96d42c9038c46b25b9';
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges/' + id + '/send');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: [
              {
                "_id": "596002603c435402ccbef6e5",
                "recipientGame": {
                    "_id": "595d98fa09049010143e139c",
                    "title": "mkvmkdmvkdmv",
                    "category": "Strategiczna",
                    "state": "Nowa",
                    "userID": "594d750e23e60c0de45af913"
                },
                "sender": {
                    "_id": "594a5c96d42c9038c46b25b9",
                    "local": {
                        "email": "kamil.wojcik.525@gmail.com",
                        "login": "magic"
                    }
                },
                "recipient": {
                    "_id": "594d750e23e60c0de45af913",
                    "local": {
                        "email": "1981600428739713",
                        "login": "1981600428739713"
                    }
                },
                "date": "2017-07-07T21:51:28.974Z",
                "status": "pending",
                "proposeGames": [
                    "dsds",
                    "sfsffsfsfssffssf"
                ]
            }
          ]
        })));
      });
      userhistoryservice.getSentHistoryExchanges('594a5c96d42c9038c46b25b9').subscribe((response) => {
        expect(response.length).toEqual(1);
        expect(response[0]._id).toBe('596002603c435402ccbef6e5');
        expect(response[0].sender.local.login).toBe('magic');
        expect(response[0].sender.local.email).toBe('kamil.wojcik.525@gmail.com');
        expect(response[0].recipient.local.email).toBe('1981600428739713');
        expect(response[0].proposeGames[1]).toBe('sfsffsfsfssffssf');
      });
    })));
    it('Fail retrieving the history of sent requests', async(inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '594a5c96d42c9038c46b25b9';
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges/' + id + '/send');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: { message: 'Error' }
        })));
      });
      userhistoryservice.getSentHistoryExchanges('594a5c96d42c9038c46b25b9').subscribe((response) => {
        expect(response.message).toEqual('Error');
      });
    })));
  });
  describe('Feature that retrieves the history of user received requests', () => {
    it('Success retrieving the history of received requests', async(inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '594d750e23e60c0de45af913';
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges/' + id + '/received');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: [
              {
                "_id": "5960f5f65ca8a419a8f7961f",
                "recipientGame": {
                    "_id": "595d98fa09049010143e139c",
                    "title": "mkvmkdmvkdmv",
                    "category": "Strategiczna",
                    "state": "Nowa",
                    "userID": "594d750e23e60c0de45af913"
                },
                "sender": {
                    "_id": "594a5c96d42c9038c46b25b9",
                    "local": {
                        "email": "kamil.wojcik.525@gmail.com",
                        "login": "magic"
                    }
                },
                "recipient": {
                    "_id": "594d750e23e60c0de45af913",
                    "local": {
                        "email": "1981600428739713",
                        "login": "1981600428739713"
                    }
                },
                "date": "2017-07-08T15:10:46.633Z",
                "status": "pending",
                "proposeGames": [
                    "Alchemicy",
                    "xsxs",
                    "sfsffsfsfssffssf",
                    "dsds"
                ]
            }
          ]
        })));
      });
      userhistoryservice.getReceivedHistoryExchanges('594d750e23e60c0de45af913').subscribe((response) => {
        expect(response.length).toEqual(1);
        expect(response[0].recipient._id).toBe('594d750e23e60c0de45af913');
        expect(response[0].recipient.local.login).toBe('1981600428739713');
        expect(response[0].recipient.local.email).toBe('1981600428739713');
        expect(response[0].proposeGames[0]).toBe('Alchemicy');
      });
    })));
    it('Fail retrieving the history of received requests', async(inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '594a5c96d42c9038c46b25b9';
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges/' + id + '/received');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: { message: 'Error' }
        })));
      });
      userhistoryservice.getReceivedHistoryExchanges('594a5c96d42c9038c46b25b9').subscribe((response) => {
        expect(response.message).toEqual('Error');
      });
    })));
  });
  describe('Feature that discard a request for exchange', () => {
    it('Success discard a request for exchange', async(inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '594a5c96d42c9038c46b25b9';
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges/' + id);
        expect(connection.request.method).toBe(RequestMethod.Patch);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
      userhistoryservice.saveDiscardExchane('594a5c96d42c9038c46b25b9').subscribe((response) => {

      });
    })));
    it('Fail discard a request for exchange', async(inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '594a5c96d42c9038c46b25b9';
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges/' + id);
        expect(connection.request.method).toBe(RequestMethod.Patch);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: { message: 'Error' }
        })));
      });
      userhistoryservice.saveDiscardExchane('594a5c96d42c9038c46b25b9').subscribe((response) => {
        expect(response.message).toEqual('Error');
      });
    })));
  });
  describe('Feature that accept a request for exchange', () => {
    it('Success accept a request for exchange', async(inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '594a5c96d42c9038c46b25b9'
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges/'+ id);
        expect(connection.request.method).toBe(RequestMethod.Patch);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
      userhistoryservice.saveAcceptExchange('594a5c96d42c9038c46b25b9', 'rejected').subscribe((response) => {

      });
    })));
    it('Fail accept a request for exchange', async(inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '594a5c96d42c9038c46b25b9'
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges/' + id);
        expect(connection.request.method).toBe(RequestMethod.Patch);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: { message: 'Error' }
        })));
      });
      userhistoryservice.saveAcceptExchange('594a5c96d42c9038c46b25b9', 'accepted').subscribe((response) => {
        expect(response.message).toEqual('Error');
      });
    })));
  });
});