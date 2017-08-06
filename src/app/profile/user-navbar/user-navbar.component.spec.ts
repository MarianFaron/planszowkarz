import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNavbarComponent } from './user-navbar.component';

describe('UserNavbarComponent', () => {
  let component: UserNavbarComponent;
  let fixture: ComponentFixture<UserNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string):String => {
     return store[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should check ngOnInit', () => {
    component.ngOnInit();
    expect(component.currentTab).toBeDefined();
    expect(component.currentTab).toBe("Moje gry");
  });

  it('should set current tab name', () => {
    expect(component.currentTab).toBeDefined();
    component.setCurrentTabName('Ustawienia');

    expect(component.currentTab).toBe('Ustawienia');
  });
  
  describe('NotificationCount()', () => {
    it('should get notification count', () => {
      expect(localStorage.setItem('notificationsCount', '5')).toBe('5');
      expect(component.notificationsCount()).toBe('5');
      expect(localStorage.getItem('notificationsCount')).toBe('5');
    });

    it('should get null value', () => {
      expect(localStorage.getItem('notificationsCount')).toBeNull(); // null
      expect(component.notificationsCount()).toBeNull();
    });   
  });
});
