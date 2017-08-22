import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { UserInfoService } from '../user-info/user-info.service';
import { AppService } from '../../app.service';
import { NotificationsService } from 'angular2-notifications';

import { UserConfigComponent } from './user-config.component';

describe('UserConfigComponent', () => {
  let component: UserConfigComponent;
  let fixture: ComponentFixture<UserConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConfigComponent ]
    })
    .compileComponents();
  }));

  /*beforeEach(() => {
    fixture = TestBed.createComponent(UserConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});

/*describe('UserConfig', () => {
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

  it('should edit user data', async(inject([UserInfoService, XHRBackend], (userinfoservice, mockbackend) => {
    mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:8080/app/users/58f9f03cb4695b0250a6eb43');
        expect(connection.request.method).toBe(RequestMethod.Patch);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        expect(connection.request.getBody()).toEqual(JSON.stringify(
            {
              login: 'Magic525',
              surName: 'Kamil',
              dateBirth: '1995-04-18',
              city: 'Poznań',
              contactNumber: '881-945-780'
            }, null, 2
        ));
        connection.mockRespond(new Response(new ResponseOptions({
          body: {message: "Successfull edit user"},
          status: 200
        })));
    });

    const user = {"_id":"58f9f03cb4695b0250a6eb43","surName":"Kamil","dateBirth":"1995-04-18","city":"Poznań","contactNumber":"881-945-780","local":{"password":"$2a$08$gFmk22JCuBaqz0K.82IWaeP0oW9mqiNo357W0z7TFR11hlevBhxSy","email":"kamil.wojcik.525@gmail.com","login":"Magic525"}};

    userinfoservice.updateUser(user._id, user.local.login, user.surName, user.dateBirth, user.city, user.contactNumber).subscribe((user) => {
      expect(user).toBeDefined();
      expect(user.message).toBe("Successfull edit user");
    });
  })));
});*/
