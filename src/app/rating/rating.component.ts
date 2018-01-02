import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { AppService } from '../app.service';
import { RatingService } from './rating.service';
import { UserInfo } from '../profile/user-info/user-info';
import { UserGame } from '../profile/user-games/user-games';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [RatingService, AppService]
})
export class RatingComponent implements OnInit {
  
  errorMessage: string;
  usersRankList: UserInfo;
  usersGamesList: UserInfo;

  constructor(
    private http: Http,    
    private ratingService: RatingService,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.getUsersRank();
    this.getUsersGames();
  }

  getUsersRank() {
    this.ratingService.getUsersRank()
                     .subscribe(
                        users => {
                          this.usersRankList = users;
                        },
                        error => this.errorMessage = <any>error);
  }
  getUsersGames() {
    this.ratingService.getUsersGames()
                     .subscribe(
                        users => {
                          this.usersGamesList = users;
                        },
                        error => this.errorMessage = <any>error);
  }

  

}
