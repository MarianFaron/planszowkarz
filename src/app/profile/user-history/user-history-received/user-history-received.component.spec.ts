import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistoryReceivedComponent } from './user-history-received.component';

describe('UserHistoryReceivedComponent', () => {
  let component: UserHistoryReceivedComponent;
  let fixture: ComponentFixture<UserHistoryReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistoryReceivedComponent ]
    })
    .compileComponents();
  }));

  /*beforeEach(() => {
    fixture = TestBed.createComponent(UserHistoryReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
