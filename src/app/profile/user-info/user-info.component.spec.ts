import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { UserInfoComponent } from './user-info.component';
import { UserInfoService } from './user-info.service';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  let userInfoService: UserInfoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ UserInfoComponent ],
      providers: [ UserInfoService]
    })
  }));

  beforeEach(() => {
    component = TestBed.createComponent(UserInfoComponent).componentInstance;
    userInfoService = TestBed.get(UserInfoService);
    spyOn(userInfoService, "getUser").and.callFake(function(can, be, received) {
        var body: {"_id":"58f9f03cb4695b0250a6eb43","surName":"Kamil","dateBirth":"1995-04-18","city":"Poznań","contactNumber":"881-945-780","local":{"password":"$2a$08$gFmk22JCuBaqz0K.82IWaeP0oW9mqiNo357W0z7TFR11hlevBhxSy","email":"kamil.wojcik.525@gmail.com","login":"Magic525"}};
        return body;
    });

    spyOn(userInfoService, "updateUser").and.callFake(function(can, be, received) {
        var message: 'Success edit';
        return message;
    });
  });

  var user: {"_id":"58f9f03cb4695b0250a6eb43","surName":"Kamil","dateBirth":"1995-04-18","city":"Poznań","contactNumber":"881-945-780","local":{"password":"$2a$08$gFmk22JCuBaqz0K.82IWaeP0oW9mqiNo357W0z7TFR11hlevBhxSy","email":"kamil.wojcik.525@gmail.com","login":"Magic525"}};

  it("get user data from service", async() => {
    component.ngOnInit();
    expect(userInfoService.getUser("58f9f03cb4695b0250a6eb43")).toHaveBeenCalled();
    expect(component.userInfo).toBe(user);
  });

  /*it('should take user data to service', async() => {
    expect(userInfoService.updateUser("58f9f03cb4695b0250a6eb43", "Magic525", "Kamil", "1995-04-18", "Poznań", "881-945-780")).toHaveBeenCalled();
    expect(component.userInfo).toBe(user);
  });
});*/

describe('UserInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        UserInfoService
      ]
    });
  });

  it('should get user data', async(inject([UserInfoService, XHRBackend], (userinfoservice, mockbackend) => {
    mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://localhost:8080/app/users/58f9f03cb4695b0250a6eb43');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
          body: {"_id":"58f9f03cb4695b0250a6eb43","surName":"Kamil","dateBirth":"1995-04-18","city":"Poznań","contactNumber":"881-945-780","local":{"password":"$2a$08$gFmk22JCuBaqz0K.82IWaeP0oW9mqiNo357W0z7TFR11hlevBhxSy","email":"kamil.wojcik.525@gmail.com","login":"Magic525"}}
        })));
    });

    userinfoservice.getUser('58f9f03cb4695b0250a6eb43').subscribe((user) => {
        expect(user._id).toEqual('58f9f03cb4695b0250a6eb43');
        expect(user.local.email).toEqual('kamil.wojcik.525@gmail.com');
        expect(user.surName).toBe('Kamil');
    });
  })));

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
});
