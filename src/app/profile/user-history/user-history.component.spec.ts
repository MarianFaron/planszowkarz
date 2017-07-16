import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserHistoryService } from './user-history.service';
import { UserHistoryComponent } from './user-history.component';

describe('UserHistoryComponent', () => {
  let component: UserHistoryComponent;
  let fixture: ComponentFixture<UserHistoryComponent>;

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('', () => {
    
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
        UserHistoryService
      ]
    });
  });
  describe('Feature that retrieves data about user exchange history', inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
    it('Success request for user exchange history', () => {
      mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
      userhistoryservice.getHistoryExchanges().subscribe((user) => {

      });
    });
    it('Fail request for user exchange history', () => {
       mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
      userhistoryservice.getHistoryExchanges().subscribe((user) => {

      });
    });
  }));
  describe('Feature that retrieves the history of user sended requests', inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
    it('Success retrieving the history of sent requests', () => {
      mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
      userhistoryservice.getSentHistoryExchanges().subscribe((user) => {

      });
    });
    it('Fail retrieving the history of sent requests', () => {
      mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
      userhistoryservice.getSentHistoryExchanges().subscribe((user) => {

      });
    });
  }));
  describe('Feature that retrieves the history of user received requests', inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
    it('Success retrieving the history of received requests', () => {
      mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
      userhistoryservice.getReceivedHistoryExchanges().subscribe((user) => {

      });
    });
    it('Fail retrieving the history of received requests', () => {
      mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
      userhistoryservice.getReceivedHistoryExchanges().subscribe((user) => {

      });
    });
  }));
  describe('Feature that discard a request for exchange', inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
    it('Success discard a request for exchange', () => {
      mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges');
        expect(connection.request.method).toBe(RequestMethod.Patch);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
      userhistoryservice.saveDiscardExchane().subscribe((user) => {

      });
    });
    it('Fail discard a request for exchange', () => {
      mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges');
        expect(connection.request.method).toBe(RequestMethod.Patch);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
      userhistoryservice.saveDiscardExchane().subscribe((user) => {

      });
    });
  }));
  describe('Feature that accept a request for exchange', inject([UserHistoryService, XHRBackend], (userhistoryservice, mockbackend) => {
    it('Success accept a request for exchange', () => {
      mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges');
        expect(connection.request.method).toBe(RequestMethod.Patch);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
      userhistoryservice.saveAcceptExchange().subscribe((user) => {

      });
    });
    it('Fail accept a request for exchange', () => {
      mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:8080/app/exchanges');
        expect(connection.request.method).toBe(RequestMethod.Patch);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
      userhistoryservice.saveAcceptExchange().subscribe((user) => {

      });
    });
  }));
});