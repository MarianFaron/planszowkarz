import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { FlashMessagesService } from 'angular2-flash-messages';

import { UserInfoComponent } from '../user-info/user-info.component'
import { UserGamesComponent } from './user-games.component';
import { UserGameService } from './user-games.service';
import { AppService } from '../../app.service';
import { NotificationsService } from 'angular2-notifications';


describe('UserGameComponent', () => {
  let component: UserGamesComponent;
  let fixture: ComponentFixture<UserGamesComponent>;
  let usergameservice: UserGameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, UserInfoComponent ],
      declarations: [ UserGamesComponent ],
      providers: [ UserGameService, FlashMessagesService, AppService, NotificationsService ]
    })
  }));

  /*beforeEach(() => {
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

  it("get user game from service", async() => {
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
        UserGameService, 
        AppService, 
        NotificationsService
      ]
    });
  });

  describe('should get user-game list', () => {
    var usersUrl = 'http://localhost:8080/app/users/'
    it('success - get user-game list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        const id = '594a5c96d42c9038c46b25b9';
        expect(connection.request.url).toEqual(usersUrl + id +'/userGames');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions({
        body: [
                {
                    "_id": "594a61a9d42c9038c46b25c4",
                    "title": "Martwa Zima",
                    "category": "Strategiczna",
                    "state": "Używana",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu cursus quam, at sagittis quam. Duis ac massa massa. Pellentesque neque nisi, mollis vel malesuada vel, pharetra a ex. Aenean porttitor ultrices consequat. Phasellus blandit nunc ac lorem congue, eget sagittis nunc eleifend. Aliquam metus urna, gravida eget tempus quis, pharetra pulvinar ligula. Aenean et est dui. Suspendisse vitae quam cursus, sagittis neque volutpat, luctus massa. Fusce ultricies tristique urna vel cursus.",
                    "createdDate": "2017-06-21T12:08:08.000Z",
                    "userID": "594a5c96d42c9038c46b25b9",
                    "Image": "rebel-gra-towarzyska-koncept-b-iext41906673.jpg",
                    "modifiedDate": "2017-07-04T00:00:00.000Z"
                },
                {
                    "_id": "594a61d4d42c9038c46b25c5",
                    "title": "Gra o Tron",
                    "category": "Logiczna",
                    "state": "Używana",
                    "description": "Quisque fermentum rhoncus mollis. Suspendisse potenti. Vestibulum nec odio eros. Aenean efficitur pretium maximus. Nullam volutpat eros id sem molestie sollicitudin. Curabitur dictum vitae arcu eu rutrum. Nam ultricies aliquet sodales. Nam efficitur suscipit odio, volutpat lobortis risus luctus id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed sapien at nibh pretium pretium. Quisque commodo efficitur tortor.",
                    "createdDate": "2017-06-21T12:08:52.000Z",
                    "userID": "594a5c96d42c9038c46b25b9",
                    "Image": "graotron.jpg",
                    "modifiedDate": "2017-07-03T00:00:00.000Z"
                },
                {
                    "_id": "594a622dd42c9038c46b25c6",
                    "title": "Alchemicy",
                    "category": "Strategiczna",
                    "state": "Nowa",
                    "description": "Fusce id hendrerit dui. Sed lobortis finibus pharetra. Aenean ac aliquam massa. Vivamus vitae orci ac quam eleifend porttitor. Ut nulla elit, aliquet sed pulvinar id, pharetra at ante. Maecenas ac leo dui. Vestibulum ut justo fringilla magna dignissim malesuada. Duis rhoncus nibh quis egestas placerat. Morbi eget elementum arcu. Suspendisse potenti.",
                    "createdDate": "2017-06-21T12:10:20.000Z",
                    "userID": "594a5c96d42c9038c46b25b9",
                    "Image": "sekary.jpg",
                    "modifiedDate": "2017-07-04T00:00:00.000Z"
                }
              ]
        })));
      });

      usergameservice.getGames('594a5c96d42c9038c46b25b9').subscribe((games) => {
        expect(games).toBeDefined();
        expect(games.length).toBe(3);
        expect(games[0].title).toEqual('Martwa Zima');
        expect(games[2].description).toEqual('Fusce id hendrerit dui. Sed lobortis finibus pharetra. Aenean ac aliquam massa. Vivamus vitae orci ac quam eleifend porttitor. Ut nulla elit, aliquet sed pulvinar id, pharetra at ante. Maecenas ac leo dui. Vestibulum ut justo fringilla magna dignissim malesuada. Duis rhoncus nibh quis egestas placerat. Morbi eget elementum arcu. Suspendisse potenti.');
        expect(games[0].category).toEqual('Strategiczna');
        expect(games[2].state).toEqual('Nowa');
        expect(games[1]._id).toEqual('594a61d4d42c9038c46b25c5');
      });
    })));

    it('fail - get user-game list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        const id = '594a5c96d42c9038c46b25b7';
        expect(connection.request.url).toEqual(usersUrl + id + '/userGames');
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions(
          { 
            body: {message: "User games not found"}
          }
        )));
      });

      usergameservice.getGames('594a5c96d42c9038c46b25b7').subscribe(
        (games) => {
          expect(games).toBeDefined();
          expect(games.message).toBe("User games not found");
      });
    })));
  });

  describe('should add user-game to list', () => {
    const userGamesUrl = 'http://localhost:8080/app/userGames';
    it('success - add user-game to list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual(userGamesUrl);
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        expect(connection.request.getBody()).toEqual(JSON.stringify(
            {
              title: 'ccsdcsc123123333',
              category: 'Strategiczna',
              state: 'Nowa',
              description: 'cscscs',
              createdDate: '28-04-2017',
              userID: '594a5c96d42c9038c46b25b9',
              Image: 'default.png'
            }, null, 2
        ));
        connection.mockRespond(new Response(new ResponseOptions(
          { 
            body: {message: "User game created"}
          }
        )));
      });

      const game = {"title":"ccsdcsc123123333", "category":"Strategiczna", "state":"Nowa", "description":"cscscs","createdDate":"28-04-2017", "userID":"594a5c96d42c9038c46b25b9", "Image":"default.png"};

      usergameservice.create(game.title, game.category, game.state, game.description, game.createdDate, game.userID, game.Image).subscribe(
        (games) => {
          expect(games).toBeDefined();
          expect(games.message).toBe("User game created");
      });
    })));

    it('fail - add user-game to list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        expect(connection.request.url).toEqual(userGamesUrl);
        expect(connection.request.method).toBe(RequestMethod.Post);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        expect(connection.request.getBody()).toEqual(JSON.stringify(
            {
              title: 'ccsdcsc123123333',
              category: 'Strategiczna',
              state: 'Używana',
              description: 'cscscs',
              createdDate: '28-04-2017',
              userID: '594a5c96d42c9038c46b25b9',
              Image: 'default.png'
            }, null, 2
        ));
        connection.mockRespond(new Response(new ResponseOptions(
          { 
            body: {message: "Error: User game not created"}
          }
        )));
      });

      const game = {"title":"ccsdcsc123123333", "category":"Strategiczna", "state":"Używana", "description":"cscscs", "createdDate":"28-04-2017", "userID":"594a5c96d42c9038c46b25b9", "Image":"default.png"};

      usergameservice.create(game.title, game.category, game.state, game.description, game.createdDate, game.userID, game.Image).subscribe(
        (games) => {
          expect(games).toBeDefined();
          expect(games.message).toBe("Error: User game not created");
      });
    })));
  });

  describe('should edit user-game on list', () => {
    const userGamesUrl = 'http://localhost:8080/app/userGames/';
    it('success - edit user-game on list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
      mockbackend.connections.subscribe(connection => {
        const id = '58ebec8a16f8161d00f8e063';
        expect(connection.request.url).toEqual(userGamesUrl + id);
        expect(connection.request.method).toBe(RequestMethod.Patch);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        expect(connection.request.getBody()).toEqual(JSON.stringify(
            {
              title: 'ccsdcsc123123333elo',
              category: 'Strategiczna',
              state: 'Nowa',
              description: '2132312312312',
              modifiedDate: '27-08-2017',
              Image: 'game.png'
            }, null, 2
        ));
        connection.mockRespond(new Response(new ResponseOptions(
          { 
            body: {message: "User game edited"}
          }
        )));
      });

      const game = {"_id":"58ebec8a16f8161d00f8e063","title":"ccsdcsc123123333elo", "category":"Strategiczna", "state":"Nowa", "description":"2132312312312", "modifiedDate": "27-08-2017", "Image": "game.png"};

      usergameservice.update(game._id, game.title, game.category, game.state, game.description, game.modifiedDate, game.Image).subscribe(
        (games) => {
          expect(games).toBeDefined();
          expect(games.message).toBe("User game edited");
      });
    })));

    it('fail - edit user-game on list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
      mockbackend.connections.subscribe(connection => {
        const id = '58ebec8a16f8161d00f8e063';
        expect(connection.request.url).toEqual(userGamesUrl + id);
        expect(connection.request.method).toBe(RequestMethod.Patch);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        expect(connection.request.getBody()).toEqual(JSON.stringify(
            {
              title: 'ccsdcsc123123333elo',
              category: 'Strategiczna',
              state: 'Nowa',
              description: '2132312312312',
              modifiedDate: '27-08-2017',
              Image: 'game.png'
            }, null, 2
        ));
        connection.mockRespond(new Response(new ResponseOptions(
          { 
            body: {message: "Error: User game not found"}
          }
        )));
      });

      const game = {"_id":"58ebec8a16f8161d00f8e063","title":"ccsdcsc123123333elo", "category":"Strategiczna", "state":"Nowa", "description":"2132312312312", "modifiedDate": "27-08-2017", "Image": "game.png"};

      usergameservice.update(game._id, game.title, game.category, game.state, game.description, game.modifiedDate, game.Image).subscribe(
        (games) => {
          expect(games).toBeDefined();
          expect(games.message).toBe("Error: User game not found");
      });
    })));
  });

  describe('should delete user-game from list', () => {
    const userGamesUrl = 'http://localhost:8080/app/userGames/';
    it('success - delete user-game from list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
      mockbackend.connections.subscribe(connection => {
        const id = '594a61a9d42c9038c46b25c4';
        expect(connection.request.url).toEqual(userGamesUrl + id);
        expect(connection.request.method).toBe(RequestMethod.Delete);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions(
          { 
            body: {message: "User game deleted"}
          }
        )));
      });

      usergameservice.delete('594a61a9d42c9038c46b25c4').subscribe(
        (games) => {
          expect(games).toBeDefined();
          expect(games.message).toBe("User game deleted");
      });
    })));

    it('success - delete user-game from list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
      mockbackend.connections.subscribe(connection => {
        const id = '594a61a9d42c9038c46b25c45';
        expect(connection.request.url).toEqual(userGamesUrl + id);
        expect(connection.request.method).toBe(RequestMethod.Delete);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
        connection.mockRespond(new Response(new ResponseOptions(
          { 
            body: {message: "Error: User game not found"}
          }
        )));
      });

      usergameservice.delete('594a61a9d42c9038c46b25c45').subscribe(
        (games) => {
          expect(games).toBeDefined();
          expect(games.message).toBe("Error: User game not found");
      });
    })));
  });
});
