import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { CoreService } from './core.service';
import { UserGame } from './../user-game/user-game';
import { UserGameService } from './../user-game/user-game.service';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css'],
  providers: [UserGameService, CoreService]
})
export class CoreComponent implements OnInit {

  errorMessage: string;
  userGame: UserGame[];
  
  constructor(private http: Http,  private CoreService: CoreService) { 
    
  }

  ngOnInit() {
    this.getUserGame();
  }

  getUserGame() {

    this.CoreService.getGames()
                      .subscribe(
                        userGame => this.userGame = userGame.reverse(),
                        error => this.errorMessage = <any>error);
  }
}
