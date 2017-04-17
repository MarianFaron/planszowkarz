import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpModule, Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { UserGameService } from './user-game.service';

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
        expect(connection.request.method).toBe(RequestMethod.Get);
        connection.mockRespond(new Response(new ResponseOptions({
        body: [
                {"_id":"58ebec8a16f8161d00f8e063","title":"ccsdcsc123123333","description":"cscscs","userID":"58e45c5c9030ea1928a33fea"},
                {"_id":"58ece357fec91a2160819036","title":"Tajniacy","description":"Taka niezła","userID":"58e45c5c9030ea1928a33fea"},
                {"_id":"58ed29f7f9bc3f1b08cabb46","title":"asdasda","description":"asdasdas","userID":"58e45c5c9030ea1928a33fea"},
                {"_id":"58ed3117f9bc3f1b08cabb47","title":"asdasda","description":"asdasdadas","userID":"58e45c5c9030ea1928a33fea"}
              ]
        })));
    });

    usergameservice.getGames('58e45c5c9030ea1928a33feaz').subscribe((games) => {
          expect(games.length).toBe(4);
          expect(games[0].title).toEqual('ccsdcsc123123333');
          expect(games[3].description).toEqual('asdasdadas');
          expect(games[2]._id).toEqual('58ed29f7f9bc3f1b08cabb46');
    });
  })));

  it('should show error when we dont have id to get user-games', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
    mockbackend.connections.subscribe((connection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        connection.mockRespond(new Response(new ResponseOptions(
        { body: {message: "User games not found"},
          status: 404
        }
        )));
    });

    usergameservice.getGames().subscribe((games) => {
      expect(games).toBeDefined();
      expect(games.message).toBe("User games not found");
          //expect(games.status).toEqual(404);
    });
  })));

  it('should add user-game to list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
      mockbackend.connections.subscribe((connection) => {
        expect(connection.request.method).toBe(RequestMethod.Post);
        connection.mockRespond(new Response(new ResponseOptions(
          { body: {message: "User game created"},
            status: 201
          }
        )));
      });

      const body = {"title":"ccsdcsc123123333","description":"cscscs","userID":"58e45c5c9030ea1928a33fea"};

      usergameservice.create(body.title, body.description, body.userID).subscribe(
        (games) => {
          expect(games).toBeDefined();
          expect(games.message).toBe("User game created");
          //expect(games.status).toEqual(200);
        });
  })));

  it('should edit user-game on list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
    mockbackend.connections.subscribe(connection => {
      expect(connection.request.method).toBe(RequestMethod.Patch);
      connection.mockRespond(new Response(new ResponseOptions(
        { body: {message: "User game edited"},
          status: 200}
      )));
    });

    const body = {"_id":"58ebec8a16f8161d00f8e063","title":"ccsdcsc123123333elo","description":"2132312312312","userID":"58e45c5c9030ea1928a33fea"};

    usergameservice.update(body._id, body.title, body.description).subscribe(
      (games) => {
        expect(games).toBeDefined();
        expect(games.message).toBe("User game edited");
        //expect(games.status).toEqual(200);
    });
  })));

  it('should delete user-game from list', async(inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
    mockbackend.connections.subscribe(connection => {
      expect(connection.request.method).toBe(RequestMethod.Delete);
      connection.mockRespond(new Response(new ResponseOptions(
        { body: {message: "User game deleted"},
          status: 204}
      )));
    });

    const body = {"_id":"58ebec8a16f8161d00f8e063","title":"ccsdcsc123123333","description":"cscscs","userID":"58e45c5c9030ea1928a33fea"};

    usergameservice.delete(body._id).subscribe(
      (games) => {
        expect(games).toBeDefined();
        expect(games.message).toBe("User game deleted");
        //expect(games.status).toEqual(204);
    });
  })));
});
