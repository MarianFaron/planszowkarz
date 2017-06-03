import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FlashMessagesService } from 'angular2-flash-messages';

import { UserInfoComponent } from '../user-info/user-info.component'
import { UserGamesComponent } from './user-games.component';
import { UserGameService } from './user-games.service';


describe('UserGameComponent', () => {
  let component: UserGamesComponent;
  let fixture: ComponentFixture<UserGamesComponent>;
  let usergameservice: UserGameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, UserInfoComponent ],
      declarations: [ UserGamesComponent ],
      providers: [ UserGameService, FlashMessagesService ]
    })
  }));

  beforeEach(() => {
    component = TestBed.createComponent(UserGamesComponent).componentInstance;
    usergameservice = TestBed.get(UserGameService);

    spyOn(usergameservice, "getGames").and.callFake(function(can, be, received) {
        var body = [
            {"_id":"58ebec8a16f8161d00f8e063","title":"ccsdcsc123123333", "category":"Logiczna", "state":"Używana", "description":"cscscs","userID":"58e45c5c9030ea1928a33feaz"},
            {"_id":"58ece357fec91a2160819036","title":"Tajniacy", "category":"Strategiczna", "state":"Nowa","description":"Taka niezła","userID":"58e45c5c9030ea1928a33feaz"},
            {"_id":"58ed29f7f9bc3f1b08cabb46","title":"asdasda", "category":"Figurkowa", "state":"używana","description":"asdasdas","userID":"58e45c5c9030ea1928a33feaz"},
            {"_id":"58ed3117f9bc3f1b08cabb47","title":"asdasda", "category":"Strategiczna", "state":"Nowa","description":"asdasdadas","userID":"58e45c5c9030ea1928a33feaz"}
        ];
        return body;
    });

    spyOn(usergameservice, "create").and.callFake(function(can, be, received) {
        var message: 'Success create';
        return message;
    });

    spyOn(usergameservice, "update").and.callFake(function(can, be, received) {
        var message: 'Success update';
        return message;
    });

    spyOn(usergameservice, "delete").and.callFake(function(can, be, received) {
        var message: 'Success delete';
        return message;
    });
  });

  var game = [
        {"_id":"58ebec8a16f8161d00f8e063","title":"ccsdcsc123123333", "category":"Logiczna", "state":"Używana", "description":"cscscs", "createdDate": "2017-05-04", "userID":"58e45c5c9030ea1928a33feaz"},
        {"_id":"58ece357fec91a2160819036","title":"Tajniacy", "category":"Strategiczna", "state":"Nowa","description":"Taka niezła", "createdDate": "2017-05-04","userID":"58e45c5c9030ea1928a33feaz"},
        {"_id":"58ed29f7f9bc3f1b08cabb46","title":"asdasda", "category":"Figurkowa", "state":"używana","description":"asdasdas", "createdDate": "2017-05-04","userID":"58e45c5c9030ea1928a33feaz"},
        {"_id":"58ed3117f9bc3f1b08cabb47","title":"asdasda", "category":"Strategiczna", "state":"Nowa","description":"asdasdadas", "createdDate": "2017-05-04","userID":"58e45c5c9030ea1928a33feaz"}
  ];

  /*it("get user game from service", async() => {
    component.ngOnInit();
    expect(usergameservice.getGames("58f9f03cb4695b0250a6eb43")).toHaveBeenCalled();
    expect(component.userGame).toBe(game);
  });

  it('should take user data to service', async() => {
    expect(usergameservice.create("ccsdcsc123123333", "Strategiczna", "Nowa", "cscscs", "28-04-2017", "58e45c5c9030ea1928a33fea", "image1.jpg")).toHaveBeenCalled();
    expect(component.userGame).toBe(game[0]);
  });*/
});

describe('UserGameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        UserGameService
      ]
    });
  });

  it('should get user-game list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
    mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://planszowkarz.herokuapp.com/app/users/58e45c5c9030ea1928a33feaz/userGames');
        expect(connection.request.method).toBe(RequestMethod.Get);
        connection.mockRespond(new Response(new ResponseOptions({
        body: [
                {"_id":"58ebec8a16f8161d00f8e063","title":"ccsdcsc123123333", "category":"Logiczna", "state":"Używana", "description":"cscscs","userID":"58e45c5c9030ea1928a33feaz"},
                {"_id":"58ece357fec91a2160819036","title":"Tajniacy", "category":"Strategiczna", "state":"Nowa","description":"Taka niezła","userID":"58e45c5c9030ea1928a33feaz"},
                {"_id":"58ed29f7f9bc3f1b08cabb46","title":"asdasda", "category":"Figurkowa", "state":"używana","description":"asdasdas","userID":"58e45c5c9030ea1928a33feaz"},
                {"_id":"58ed3117f9bc3f1b08cabb47","title":"asdasda", "category":"Strategiczna", "state":"Nowa","description":"asdasdadas","userID":"58e45c5c9030ea1928a33feaz"}
              ]
        })));
    });

    usergameservice.getGames('58e45c5c9030ea1928a33feaz').subscribe((games) => {
        expect(games.length).toBe(4);
        expect(games[0].title).toEqual('ccsdcsc123123333');
        expect(games[3].description).toEqual('asdasdadas');
        expect(games[1].category).toEqual('Strategiczna');
        expect(games[3].state).toEqual('Nowa');
        expect(games[2]._id).toEqual('58ed29f7f9bc3f1b08cabb46');
    });
  })));

  it('should show error when we dont have id to get user-games', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
    mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://planszowkarz.herokuapp.com/app/users//userGames');
        expect(connection.request.method).toBe(RequestMethod.Get);
        connection.mockRespond(new Response(new ResponseOptions(
          { body: {message: "User games not found"},
            status: 404
          }
        )));
    });

    usergameservice.getGames('').subscribe(
      (games) => {
        expect(games).toBeDefined();
        expect(games.message).toBe("User games not found");
            //expect(games.status).toEqual(404);
    });
  })));

  it('should add user-game to list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual('http://planszowkarz.herokuapp.com/app/userGames');
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        expect(connection.request.getBody()).toEqual(JSON.stringify(
            {
              title: 'ccsdcsc123123333',
              category: 'Strategiczna',
              state: 'Nowa',
              description: 'cscscs',
              createdDate: '28-04-2017',
              userID: '58e45c5c9030ea1928a33fea'
            }, null, 2
        ));
        connection.mockRespond(new Response(new ResponseOptions(
          { body: {message: "User game created"},
            status: 201
          }
        )));
      });

      const user = {"title":"ccsdcsc123123333", "category":"Strategiczna", "state":"Nowa", "description":"cscscs","createdDate":"28-04-2017", "userID":"58e45c5c9030ea1928a33fea"};

      usergameservice.create(user.title, user.category, user.state,  user.description, user.createdDate, user.userID).subscribe(
        (games) => {
          expect(games).toBeDefined();
          expect(games.message).toBe("User game created");
      });
  })));

  it('should edit user-game on list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
      mockbackend.connections.subscribe(connection => {
        expect(connection.request.url).toEqual('http://planszowkarz.herokuapp.com/app/userGames/58ebec8a16f8161d00f8e063');
        expect(connection.request.method).toBe(RequestMethod.Patch);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        expect(connection.request.getBody()).toEqual(JSON.stringify(
            {
              title: 'ccsdcsc123123333elo',
              category: 'Strategiczna',
              state: 'Nowa',
              description: '2132312312312'
            }, null, 2
        ));
        connection.mockRespond(new Response(new ResponseOptions(
          { body: {message: "User game edited"},
            status: 200
          }
        )));
      });

      const body = {"_id":"58ebec8a16f8161d00f8e063","title":"ccsdcsc123123333elo", "category":"Strategiczna", "state":"Nowa", "description":"2132312312312","userID":"58e45c5c9030ea1928a33fea"};

      usergameservice.update(body._id, body.title, body.category, body.state, body.description).subscribe(
        (games) => {
          expect(games).toBeDefined();
          expect(games.message).toBe("User game edited");
      });
  })));

  it('should delete user-game from list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
      mockbackend.connections.subscribe(connection => {
        expect(connection.request.url).toEqual('http://planszowkarz.herokuapp.com/app/userGames/58ebec8a16f8161d00f8e063');
        expect(connection.request.method).toBe(RequestMethod.Delete);
        connection.mockRespond(new Response(new ResponseOptions(
          { body: {message: "User game deleted"},
            status: 204
          }
        )));
      });

      const body = {"_id":"58ebec8a16f8161d00f8e063","title":"ccsdcsc123123333", "category":"Strategiczna", "state":"Nowa", "description":"cscscs","userID":"58e45c5c9030ea1928a33fea"};

      usergameservice.delete(body._id).subscribe(
        (games) => {
          expect(games).toBeDefined();
          expect(games.message).toBe("User game deleted");
      });
  })));
});
