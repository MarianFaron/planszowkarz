import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { CoreService } from './core.service';
import { AppService } from '../app.service';
import { UserGameService } from './../profile/user-games/user-games.service';
import { UserGame } from './../profile/user-games/user-games';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  providers: [AppService, CoreService, UserGameService,]
})
export class CoreComponent implements OnInit {

  errorMessage: string;
  userGame: UserGame[];

  constructor(
    private http: Http, 
    private router: Router, 
    private CoreService: CoreService, 
    private appService: AppService
  ) {}

  ngOnInit() {
    this.getUserGame();
  }

  getUserGame() {
    this.CoreService.getGames()
                    .subscribe(
                        userGame => {
                            this.userGame = userGame
                        },
                        error => this.errorMessage = <any>error);
  }
}