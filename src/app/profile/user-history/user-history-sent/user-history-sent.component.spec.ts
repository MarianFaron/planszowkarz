import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistorySentComponent } from './user-history-sent.component';

describe('UserHistoryPendingComponent', () => {
  let component: UserHistorySentComponent;
  let fixture: ComponentFixture<UserHistorySentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistorySentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHistorySentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
