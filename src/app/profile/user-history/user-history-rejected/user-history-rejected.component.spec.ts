import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserHistoryRejectedComponent } from './user-history-rejected.component';
import { AppService } from '../../../app.service';
import { UserHistoryService } from '../user-history.service';
import { UserHistoryFilterPipe } from '../user-history.pipe';
import { NotificationsService } from 'angular2-notifications';

describe('UserHistoryRejectedComponent', () => {
  let component: UserHistoryRejectedComponent;
  let fixture: ComponentFixture<UserHistoryRejectedComponent>;
  let userhistoryservice: UserHistoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHistoryRejectedComponent, UserHistoryFilterPipe ],
      providers: [
          UserHistoryService,
          NotificationsService, 
          AppService,
          HttpModule,
          {provide: Http, deps: [MockBackend]}
      ],
      imports:[ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(async() => {
    component = TestBed.createComponent(UserHistoryRejectedComponent).componentInstance;
    userhistoryservice = TestBed.get(UserHistoryService);
  });

  it("get user game from service", async() => {
    component.ngOnInit();
    
    spyOn(userhistoryservice, "getHistoryExchanges").and.callFake(function(can, be, received) {
        var body = [
                {
                    "_id": "597df650b42b4c087c3fb133",
                    "recipientGame": {
                        "_id": "595d98fa09049010143e139c",
                        "title": "mkvmkdmvkdmv",
                        "category": "Strategiczna",
                        "state": "Nowa",
                        "userID": "594d750e23e60c0de45af913"
                    },
                    "sender": {
                        "_id": "594a5c96d42c9038c46b25b9",
                        "local": {
                            "email": "kamil.wojcik.525@gmail.com",
                            "login": "magic"
                        }
                    },
                    "recipient": {
                        "_id": "594d750e23e60c0de45af913",
                        "facebook": {
                            "email": "xmarianf@gmail.com",
                            "name": "Marian Faron"
                        },
                        "local": {
                            "email": "1981600428739713",
                            "login": "1981600428739713"
                        }
                    },
                    "date": "2017-07-30T15:08:00.536Z",
                    "status": "pending",
                    "proposeGames": [
                        "sa",
                        "xsxs",
                        "cxcxc"
                    ]
                },
                {
                    "_id": "597df1c71e88ee10ec15fbd7",
                    "recipientGame": {
                        "_id": "595d6adfea904c199cee8d22",
                        "title": "test6",
                        "category": "Imprezowa",
                        "state": "Używana",
                        "userID": "594d750e23e60c0de45af913"
                    },
                    "sender": {
                        "_id": "594a5c96d42c9038c46b25b9",
                        "local": {
                            "email": "kamil.wojcik.525@gmail.com",
                            "login": "magic"
                        }
                    },
                    "recipient": {
                        "_id": "594d750e23e60c0de45af913",
                        "facebook": {
                            "email": "xmarianf@gmail.com",
                            "name": "Marian Faron"
                        },
                        "local": {
                            "email": "1981600428739713",
                            "login": "1981600428739713"
                        }
                    },
                    "date": "2017-07-30T14:48:39.976Z",
                    "status": "pending",
                    "proposeGames": [
                        "Alchemicy",
                        "Gra o Tron"
                    ]
                }
        ];
        return body;
    });

    userhistoryservice.getHistoryExchanges('594a5c96d42c9038c46b25b9');

    expect(userhistoryservice.getHistoryExchanges).toHaveBeenCalled();
    expect(userhistoryservice.getHistoryExchanges).toHaveBeenCalledWith("594d750e23e60c0de45af913");
    expect(component.userHistory).toEqual("asdasdsadsadsa");
  });
});
