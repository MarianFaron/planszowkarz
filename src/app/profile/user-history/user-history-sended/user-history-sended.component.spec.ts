import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistorySendedComponent } from './user-history-sended.component';

describe('UserHistoryPendingComponent', () => {
  let component: UserHistorySendedComponent;
  let fixture: ComponentFixture<UserHistorySendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistorySendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHistorySendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
