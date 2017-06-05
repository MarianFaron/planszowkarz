import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistoryPendingComponent } from './user-history-pending.component';

describe('UserHistoryPendingComponent', () => {
  let component: UserHistoryPendingComponent;
  let fixture: ComponentFixture<UserHistoryPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistoryPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHistoryPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
