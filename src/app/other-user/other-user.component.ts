import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { CoreService } from '../core/core.service';
import { OtherUserService } from './other-user.service';
import { OtherUser } from './other-user';
import { UserGame } from '../profile/user-games/user-games';


@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.scss'],
  providers: [OtherUserService, AppService, CoreService]
})

export class OtherUserComponent implements OnInit {

  errorMessage: string;
  status: string;
  userInfo: OtherUser[];
  userGame: UserGame[];
  userID: string;

  constructor( 
    private http: Http,    
    private activeRoute: ActivatedRoute,
    private otherUserService: OtherUserService,
    private appService: AppService,
    private coreService: CoreService
  ) {}


  ngOnInit() {
    let login = this.activeRoute.snapshot.params['login'];
    this.getUserInfo(login);
  }

  getUserInfo(login: string) {
    this.otherUserService.getUser(login)
                     .subscribe(
                        userInfo => {
                          this.userInfo = userInfo;
                          this.getUserID(userInfo);
                        },
                        error => this.errorMessage = <any>error);
  }

  getUserID(userInfo: any){
    this.getUserGame(userInfo._id);
  }

  getUserGame(id: string) {
    this.otherUserService.getGames(id)
      .subscribe(
                  userGame => this.userGame = userGame.reverse(),
                  error => this.errorMessage = <any>error);
  }
}