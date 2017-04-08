import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGameComponent } from './user-game.component';

describe('UserGameComponent', () => {
  let component: UserGameComponent;
  let fixture: ComponentFixture<UserGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
