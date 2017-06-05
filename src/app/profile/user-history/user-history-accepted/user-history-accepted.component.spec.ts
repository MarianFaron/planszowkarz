import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistoryAcceptedComponent } from './user-history-accepted.component';

describe('UserHistoryAcceptedComponent', () => {
  let component: UserHistoryAcceptedComponent;
  let fixture: ComponentFixture<UserHistoryAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistoryAcceptedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHistoryAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
