import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { UserInfoComponent } from './user-info.component';
import { UserInfoService } from './user-info.service';
import { AppService } from '../../app.service';
import { NotificationsService } from 'angular2-notifications';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let userInfoService: UserInfoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ UserInfoComponent ],
      providers: [ 
          UserInfoService, 
          AppService,
          NotificationsService
      ]
    })
  }));

  beforeEach(() => {
    component = TestBed.createComponent(UserInfoComponent).componentInstance;
    userInfoService = TestBed.get(UserInfoService);

    spyOn(userInfoService, "getUser").and.callFake(function(can, be, received) {
        var body: {
            "_id": "594a5c96d42c9038c46b25b9",
            "city": "miasto",
            "contactNumber": "tel",
            "dateBirth": "28-01-2000",
            "avatarImage": "default.png",
            "sumOfGrades": 0,
            "numberOfRatings": 0,
            "numberOfExchanges": 0,
            "numberOfGames": 24,
            "local": {
                "password": "$2a$08$PE0ApTyqKf4PRuBmIKcv4.oMB7y8gab7x0FMnLWFvYSmqALfC8o6u",
                "email": "kamil.wojcik.525@gmail.com",
                "login": "magic"
            }
        };

        return body;
    });
  });

  var user: {"_id":"58f9f03cb4695b0250a6eb43","surName":"Kamil","dateBirth":"1995-04-18","city":"Poznań","contactNumber":"881-945-780","local":{"password":"$2a$08$gFmk22JCuBaqz0K.82IWaeP0oW9mqiNo357W0z7TFR11hlevBhxSy","email":"kamil.wojcik.525@gmail.com","login":"Magic525"}};

  it("get user data from service", async() => {
    expect(component.userInfo).toBe(user);
  });
});

describe('UserInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        UserInfoService,
        AppService,
        NotificationsService
      ]
    });
  });

  describe('should get user data', () => {
    const usersInfoUrl = 'https://planszowkarz.pl/app/users/';

    it('success - get user data', async(inject([UserInfoService, XHRBackend], (userinfoservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
          expect(connection.request.url).toEqual(usersInfoUrl + '594a5c96d42c9038c46b25b9');
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
          connection.mockRespond(new Response(new ResponseOptions({
            body: {
                "_id": "594a5c96d42c9038c46b25b9",
                "city": "miasto",
                "contactNumber": "tel",
                "dateBirth": "28-01-2000",
                "avatarImage": "default.png",
                "sumOfGrades": 0,
                "numberOfRatings": 0,
                "numberOfExchanges": 0,
                "numberOfGames": 24,
                "local": {
                    "password": "$2a$08$PE0ApTyqKf4PRuBmIKcv4.oMB7y8gab7x0FMnLWFvYSmqALfC8o6u",
                    "email": "kamil.wojcik.525@gmail.com",
                    "login": "magic"
                }
            }
          })));
      });

      userinfoservice.getUser('594a5c96d42c9038c46b25b9').subscribe((user) => {
        expect(user._id).toEqual('594a5c96d42c9038c46b25b9');
        expect(user.local.email).toEqual('kamil.wojcik.525@gmail.com');
        expect(user.local.login).toBe('magic');
      });
    })));

    it('fail - get user data', async(inject([UserInfoService, XHRBackend], (userinfoservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
          expect(connection.request.url).toEqual(usersInfoUrl + '58f9f03cb4695b0250a6eb43e');
          expect(connection.request.method).toBe(RequestMethod.Get);
          expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
          connection.mockRespond(new Response(new ResponseOptions({
            body: {
              message: 'User not found.'
            }
          })));
      });

      userinfoservice.getUser('58f9f03cb4695b0250a6eb43e').subscribe((user) => {
        expect(user).toBeDefined();
        expect(user.message).toEqual('User not found.');
      });
    })));
  });
});
