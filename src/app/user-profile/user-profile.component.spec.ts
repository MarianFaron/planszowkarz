import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { UserInfoComponent } from './user-info/user-info.component';
import { UserProfileComponent } from './user-profile.component';


describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, UserInfoComponent ],
      declarations: [ UserProfileComponent ]
    })
  }));

  beforeEach(async(() => {
    component = TestBed.createComponent(UserProfileComponent).componentInstance;
  }));
});


