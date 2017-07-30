import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHistoryAcceptedComponent } from './user-history-accepted.component';
import { AppService } from '../../../app.service';
import { UserHistoryService } from '../user-history.service';
import { UserHistoryFilterPipe } from '../user-history.pipe';

describe('UserHistoryAcceptedComponent', () => {
  let component: UserHistoryAcceptedComponent;
  let fixture: ComponentFixture<UserHistoryAcceptedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistoryAcceptedComponent ],
      providers: [
          UserHistoryService, 
          AppService,
          UserHistoryFilterPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHistoryAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
