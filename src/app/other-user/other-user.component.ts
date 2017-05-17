import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { OtherUserService } from './other-user.service';
import { AppService } from '../app.service';
import { OtherUser } from './other-user';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute } from '@angular/router';
import { UserGame } from '../user-profile/user-games/user-games';


@Component({
  selector: 'app-other-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.scss'],
  providers: [OtherUserService, AppService]
})

export class OtherUserComponent implements OnInit {

  errorMessage: string;
  status: string;
  userInfo: OtherUser[];
  userGame: UserGame[];

  constructor( private http: Http,
               private otherUserService: OtherUserService,
               private appService: AppService,
               private flashMessage:FlashMessagesService,
               private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    let id = this.activeRoute.snapshot.params['_id'];
    this.otherUserService.getUser(id)
      .subscribe(userInfo => {
        this.userInfo = userInfo;
      });

    this.otherUserService.getGames(id)
      .subscribe(userGame => this.userGame = userGame.reverse(),
                 error => this.errorMessage = <any>error);
  }
}
