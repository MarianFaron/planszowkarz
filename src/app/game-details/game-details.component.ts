import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { CoreService } from '../core/core.service';
import { GameDetailsService } from './game-details.service';
import { UserGame } from './../profile/user-games/user-games';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  providers: [GameDetailsService, AppService, CoreService]
})
export class GameDetailsComponent implements OnInit {

  errorMessage: string;
  status: string;
  userGame: UserGame;

  constructor(
    private http: Http,
    private gameDetailsService: GameDetailsService,
    private appService: AppService,
    private activeRoute: ActivatedRoute,
    private coreService: CoreService
  ) {}

  ngOnInit() {

    let id = this.activeRoute.snapshot.params['_id'];
    this.gameDetailsService.getGame(id)
                           .subscribe(
                             userGame => this.userGame = userGame,
                             error => this.errorMessage = <any>error
                           );
   }
}