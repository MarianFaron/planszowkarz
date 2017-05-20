import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { UserInfoComponent } from './user-info/user-info.component';
import { ProfileComponent } from './profile.component';


describe('UserProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, UserInfoComponent ],
      declarations: [ ProfileComponent ]
    })
  }));

  beforeEach(async(() => {
    component = TestBed.createComponent(ProfileComponent).componentInstance;
  }));
});


