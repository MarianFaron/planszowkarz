import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { CoreService } from './core.service';
import { AppService } from '../app.service';
import { UserGameService } from './../profile/user-games/user-games.service';
import { UserGame } from './../profile/user-games/user-games';
import { SlickModule } from 'ngx-slick';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss'],
  providers: [AppService, CoreService, UserGameService,]
})
export class CoreComponent implements OnInit {

  errorMessage: string;
  userGame: UserGame[];
  slideConfig = {
    "dots": false,
    "nextArrow": "<div class='next-arrow'><i class='fa fa-angle-right'></i></div>",
    "prevArrow": "<div class='prev-arrow'><i class='fa fa-angle-left'></i></div>",
    "autoplay": true,
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "responsive": [
        {
          "breakpoint": 1200,
          "settings": {
            "slidesToShow": 3,
          }
        },
        {
          "breakpoint": 992,
          "settings": {
            "slidesToShow": 2,
          }
        },
        {
          "breakpoint": 479,
          "settings": {
            "slidesToShow": 1,
          }
        }
    ]};

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
