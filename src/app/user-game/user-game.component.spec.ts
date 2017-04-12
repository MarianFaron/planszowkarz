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

  it('should get user-game list', inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
    mockbackend.connections.subscribe((connection) => {
      //if sprawdzajacy id
      connection.mockRespond(new Response(new ResponseOptions({
        body: [
                {"_id":"58ebec8a16f8161d00f8e063","title":"ccsdcsc123123333","description":"cscscs","userID":"58e45c5c9030ea1928a33fea"},
                {"_id":"58ece357fec91a2160819036","title":"Tajniacy","description":"Taka niezła","userID":"58e45c5c9030ea1928a33fea"},
                {"_id":"58ed29f7f9bc3f1b08cabb46","title":"asdasda","description":"asdasdas","userID":"58e45c5c9030ea1928a33fea"},
                {"_id":"58ed3117f9bc3f1b08cabb47","title":"asdasda","description":"asdasdadas","userID":"58e45c5c9030ea1928a33fea"}
              ]
      })));
    });

    usergameservice.getGames('58e45c5c9030ea1928a33fea').subscribe((games) => {
          expect(games.length).toBe(4);
          expect(games[0].title).toEqual('ccsdcsc123123333');
    });
  }));

  /*it('should add user-game to list', inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {
    mockbackend.connections.subscribe((connection) => {
      // is it the correct REST type for an insert? (POST)
      expect(connection.request.method).toBe(RequestMethod.Post);
      connection.mockRespond(new Response(new ResponseOptions({status: 201})));
    });
    let data: [{"_id":"58ebec8a16f8161d00f8e063","title":"ccsdcsc123123333444","description":"cscscs","userID":"58e45c5c9030ea1928a33fea"}];
    usergameservice.create(data[0].title, data[0].description, data[0].userID).subscribe(
      (successResult) => {
        expect(successResult).toBeDefined();
        expect(successResult.status).toBe(201);
        expect(successResult.title).toBe('ccsdcsc123123333444')
      });
   }));*/

  it('should edit user-game in list', inject([UserGameService, XHRBackend], (usergameservice, mockbackend) => {

  }));
});
