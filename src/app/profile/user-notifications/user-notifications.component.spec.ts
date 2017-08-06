/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { UserNotificationsComponent } from './user-notifications.component';
import { UserNotificationsService } from './user-notifications.service';
import { AppService } from '../../app.service';
import { NotificationsService } from 'angular2-notifications';

describe('UserNotificationsComponent', () => {
  let component: UserNotificationsComponent;
  let fixture: ComponentFixture<UserNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNotificationsComponent ],
      providers: [
        NotificationsService, 
        AppService,
        HttpModule,
        {provide: Http, deps: [MockBackend]}
      ],
      imports:[ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
        UserNotificationsService,
        NotificationsService,
        AppService
      ]
    });
  });

  describe('should change status of notofication', () => {
    var changeStatusUrl = 'http://localhost:8080/app/change-status';
    it('should success - change status of notification', async(inject([UserNotificationsService, XHRBackend], (usernotificationsservce, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '';
        expect(connection.request.url).toEqual(changeStatusUrl + id);
        expect(connection.request.method).toBe(RequestMethod.Get);
        //expect(connection.request.text()).toEqual(JSON.stringify('594a5c96d42c9038c46b25b9'));
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
    })));

    it('should fail - change status of notification', async(inject([UserNotificationsService, XHRBackend], (usernotificationsservce, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '';
        expect(connection.request.url).toEqual(changeStatusUrl + id);
        expect(connection.request.method).toBe(RequestMethod.Get);
        //expect(connection.request.text()).toEqual(JSON.stringify('594a5c96d42c9038c46b25b9'));
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
    })));
  });

  describe('should get user notifications', () => {
    var appUrl = 'http://localhost:8080/app/';
    it('should success - get user notifications', async(inject([UserNotificationsService, XHRBackend], (usernotificationsservce, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '';
        expect(connection.request.url).toEqual(appUrl + id + '/notifications');
        expect(connection.request.method).toBe(RequestMethod.Get);
        //expect(connection.request.text()).toEqual(JSON.stringify('594a5c96d42c9038c46b25b9'));
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
    })));

    it('should fail - get user notifications ', async(inject([UserNotificationsService, XHRBackend], (usernotificationsservce, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '';
        expect(connection.request.url).toEqual(appUrl + id + '/notifications');
        expect(connection.request.method).toBe(RequestMethod.Get);
        //expect(connection.request.text()).toEqual(JSON.stringify('594a5c96d42c9038c46b25b9'));
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
    })));
  });

  describe('should delete user notofication', () => {
    var notificationsUrl = 'http://localhost:8080/app/notifications';
    it('should success - delete user notification', async(inject([UserNotificationsService, XHRBackend], (usernotificationsservce, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '';
        expect(connection.request.url).toEqual(notificationsUrl + id);
        expect(connection.request.method).toBe(RequestMethod.Delete);
        //expect(connection.request.text()).toEqual(JSON.stringify('594a5c96d42c9038c46b25b9'));
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
    })));

    it('should fail - delete user notifiaction', async(inject([UserNotificationsService, XHRBackend], (usernotificationsservce, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '';
        expect(connection.request.url).toEqual(notificationsUrl + id);
        expect(connection.request.method).toBe(RequestMethod.Delete);
        //expect(connection.request.text()).toEqual(JSON.stringify('594a5c96d42c9038c46b25b9'));
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {}
        })));
      });
    })));
  });
});
