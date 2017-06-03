import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        UsersService
      ]
    });
  });

  it('should send login request to server', async(inject([UsersService, XHRBackend], (usersservice, mockbackend) => {
    mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://planszowkarz.herokuapp.com/app/users/login');
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        expect(connection.request.getBody()).toEqual(JSON.stringify(
            {
              email: 'admin',
              password: 'secret'
            }, null, 2
        ));
        
        connection.mockRespond(new Response(new ResponseOptions({
          body: {message: "Successfull login"},
          status: 200
        })));
    });

    usersservice.login('admin', 'secret').subscribe(
      (user) => {
        expect(user).toBeDefined();
        expect(user.message).toBe('Successfull login');
    });
  })));

  it('should send register data to server', async(inject([UsersService, XHRBackend], (usersservice, mockbackend) => {
    mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://planszowkarz.herokuapp.com/app/users/register');
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        expect(connection.request.getBody()).toEqual(JSON.stringify(
            {
              login: 'admin',
              email: 'admin',
              password: 'secret'
            }, null, 2
        ));
        connection.mockRespond(new Response(new ResponseOptions({
          body: {message: "Successfull register"},
          status: 200
        })));
    });

    usersservice.register('admin', 'admin', 'secret' ).subscribe((user) => {
        expect(user).toBeDefined();
        expect(user.message).toBe("Successfull register");
    });
  })));

  it('should delete user date and logout', async(inject([UsersService, XHRBackend], (usersservice, mockbackend) => {
    mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://planszowkarz.herokuapp.com/app/users/logout');
        expect(connection.request.method).toBe(RequestMethod.Post);
        connection.mockRespond(new Response(new ResponseOptions({
          body: {message: 'Successful logout user'}
        })));
    });

    usersservice.logout().subscribe((user) => {
        expect(user.message).toBe('Successful logout user');
    });
  })));
});
