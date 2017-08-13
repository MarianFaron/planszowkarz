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

describe('UserNotificationService', () => {
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
    var changeStatusUrl = 'http://localhost:8080/app/change-status/';
    it('should success - change status of notification', async(inject([UserNotificationsService, XHRBackend], (usernotificationsservce, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '595ba9f5e6a11a1bb864b61f';
        expect(connection.request.url).toEqual(changeStatusUrl + id);
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: { message: "Status change"}
        })));
      });

      usernotificationsservce.changeStatus('595ba9f5e6a11a1bb864b61f').subscribe((notification) => {
        expect(notification).toBeDefined();
        expect(notification.message).toBe('Status change');
      });
    })));

    it('should fail - change status of notification', async(inject([UserNotificationsService, XHRBackend], (usernotificationsservce, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '595ba9f5e6a11a1bb864b61f';
        expect(connection.request.url).toEqual(changeStatusUrl + id);
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: { message: 'Error' }
        })));
      });

      usernotificationsservce.changeStatus('595ba9f5e6a11a1bb864b61f').subscribe((notification) => {
        expect(notification).toBeDefined();
        expect(notification.message).toBe('Error');
      });
    })));
  });

  describe('should get user notifications', () => {
    var appUrl = 'http://localhost:8080/app/';
    it('should success - get user notifications', async(inject([UserNotificationsService, XHRBackend], (usernotificationsservce, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '594d750e23e60c0de45af913';
        expect(connection.request.url).toEqual(appUrl + id + '/notifications');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: [
            {
                "_id": "595ba9f5e6a11a1bb864b61f",
                "userID": "594d750e23e60c0de45af913",
                "content": "Użytkownik: magic poprosił cię o wymianę za grę: ndjncjd .W zamian proponuje jedną ze swoich gier: Gra o Tron, Martwa Zima,  zaakceptuj lub odrzuć na jego prośbę.",
                "status": "new",
                "sendDate": "2017-07-04T14:45:09.907Z"
            },
            {
                "_id": "595baa69e6a11a1bb864b621",
                "userID": "594d750e23e60c0de45af913",
                "content": "Użytkownik: magic poprosił cię o wymianę za grę: cscsc .W zamian proponuje jedną ze swoich gier: dsds, xsxs, sa, cxcxc, sfsffsfsfssffssf, Alchemicy, xzxzx, dsds, Gra o Tron,  zaakceptuj lub odrzuć na jego prośbę.",
                "status": "new",
                "sendDate": "2017-07-04T14:47:05.601Z"
            },
            {
                "_id": "596002613c435402ccbef6e6",
                "userID": "594d750e23e60c0de45af913",
                "content": "Użytkownik: magic poprosił cię o wymianę za grę: mkvmkdmvkdmv .W zamian proponuje jedną ze swoich gier: dsds, sfsffsfsfssffssf,  zaakceptuj lub odrzuć na jego prośbę.",
                "status": "new",
                "sendDate": "2017-07-07T21:51:29.190Z"
            },
            {
                "_id": "5960f5f65ca8a419a8f79620",
                "userID": "594d750e23e60c0de45af913",
                "content": "Użytkownik: magic poprosił cię o wymianę za grę: mkvmkdmvkdmv .W zamian proponuje jedną ze swoich gier: Alchemicy, xsxs, sfsffsfsfssffssf, dsds,  zaakceptuj lub odrzuć na jego prośbę.",
                "status": "new",
                "sendDate": "2017-07-08T15:10:46.857Z"
            }
          ]
        })));
      });

      usernotificationsservce.getNotifications('594d750e23e60c0de45af913').subscribe((notification) => {
        expect(notification).toBeDefined();
        expect(notification.length).toEqual(4);
        expect(notification[1]._id).toBe('595baa69e6a11a1bb864b621');
        expect(notification[3].status).toBe('new');
        expect(notification[2].content).toBe('Użytkownik: magic poprosił cię o wymianę za grę: mkvmkdmvkdmv .W zamian proponuje jedną ze swoich gier: dsds, sfsffsfsfssffssf,  zaakceptuj lub odrzuć na jego prośbę.');
      });
    })));

    it('should fail - get user notifications ', async(inject([UserNotificationsService, XHRBackend], (usernotificationsservce, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '594d750e23e60c0de45af913';
        expect(connection.request.url).toEqual(appUrl + id + '/notifications');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: { message: 'Error'}
        })));
      });

      usernotificationsservce.getNotifications('594d750e23e60c0de45af913').subscribe((notification) => {
        expect(notification).toBeDefined();
        expect(notification.message).toBe('Error');
      });
    })));
  });

  describe('should delete user notification', () => {
    var notificationsUrl = 'http://localhost:8080/app/notifications/';
    it('should success - delete user notification', async(inject([UserNotificationsService, XHRBackend], (usernotificationsservce, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '595ba9f5e6a11a1bb864b61f';
        expect(connection.request.url).toEqual(notificationsUrl + id);
        expect(connection.request.method).toBe(RequestMethod.Delete);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {message: "Notification deleted"}
        })));
      });

      usernotificationsservce.deleteNotification('595ba9f5e6a11a1bb864b61f').subscribe((notification) => {
        expect(notification).toBeDefined();
        expect(notification.message).toBe('Notification deleted');
      });
    })));

    it('should fail - delete user notifiaction', async(inject([UserNotificationsService, XHRBackend], (usernotificationsservce, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        var id = '595ba9f5e6a11a1bb864b61f';
        expect(connection.request.url).toEqual(notificationsUrl + id);
        expect(connection.request.method).toBe(RequestMethod.Delete);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: { message: 'Bad Requested'}
        })));
      });

      usernotificationsservce.deleteNotification('595ba9f5e6a11a1bb864b61f').subscribe((notification) => {
        expect(notification).toBeDefined();
        expect(notification.message).toBe('Bad Requested');
      });
    })));
  });
});
