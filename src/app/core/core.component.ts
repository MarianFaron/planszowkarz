import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { CoreService } from './core.service';
import { UserGame } from './../user-profile/user-games/user-games';
import { UserInfo } from './../user-profile/user-info/user-info';
import { UserGameService } from './../user-profile/user-games/user-games.service';
import { UserInfoService } from './../user-profile/user-info/user-info.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
  providers: [UserGameService, UserInfoService, CoreService]
})
export class CoreComponent implements OnInit {

  errorMessage: string;
  userGame: UserGame[];
  userInfo: UserInfo;
  userGameIdArray: string[];
  userNameArray: string[] = [];

  constructor(private http: Http,  private CoreService: CoreService) {

  }

  ngOnInit() {
    this.getUserGame();
  }

  getUserGame() {
      this.CoreService.getGames()
                          .subscribe(
                                userGame => {
                                    this.userGame = userGame.reverse(),
                                    error => this.errorMessage = <any>error,
                                    this.userGameIdArray = userGame.map(obj  => obj.userID),
                                    // "Pobieram UserID wszystkich najnowszych gier"
                                    // "Dodaję UserID wszystkich najnowszych gier do tablicy"
                                    this.changeIdToLogin(this.userGameIdArray);
                                }
                          );
  }

  changeIdToLogin(array: string[]){
      // "Zamieniam wszystkie UserID na loginy");
      for (let i of array){
          this.getUser(i);
      }
  }

  getUser(id: string){
      this.CoreService.getUser(id)
                              .subscribe(
                                  userInfo => {
                                      this.userInfo = userInfo,
                                      // "Pobieram dane użytkownika gry o konkretnym UserID"),
                                      this.addLoginToArray(userInfo);
                                  },
                                  error => this.errorMessage = <any>error
                              );
  }


  addLoginToArray(userInfo: any){
      // "Dodaję login użytkownika gry do tablicy");
      if(userInfo.local != null) {
        this.userNameArray.push(userInfo.local.login);
      } else {
        this.userNameArray.push(userInfo.facebok.name);
      }

  }
}
