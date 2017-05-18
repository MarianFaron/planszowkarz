import { Component, OnInit } from '@angular/core';
import { UserGame } from '../user-profile/user-games/user-games';
import { AppService } from '../app.service';
import { CoreService } from '../core/core.service';
import { Router, CanActivate, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
  providers: [AppService, CoreService]
})
export class GamesListComponent implements OnInit {

  constructor(private appService: AppService, private coreService: CoreService, private router: Router) { }

  query: string;
  games: UserGame[];
  countGames: number;
  pageTitle: string;
  categories: string[];
  states: string[];

  errorMessage: string;
  userGame: UserGame[];
  userGameIdArray: string[];
  userNameArray: string[] = [];

  getGames() {
      this.coreService.getGames()
                          .subscribe(
                                games => {
                                    this.games = games.reverse(),
                                    error => this.errorMessage = <any>error
                                }
                          );
  }


  ngOnInit() {

    this.categories = [
      "Strategiczna",
      "Logiczna",
      "Ekonomiczna",
      "Imprezowa",
      "Karciana",
      "Figurkowa",
      "Przygodowa",
      "Rodzinna",
      "Zręcznościowa"
    ];

    this.states = [
      "Nowa",
      "Używana"
    ];

    if(localStorage.getItem('games') == 'null') {
      this.router.navigate(['/games']);
      this.pageTitle = "Wymiana gier";
      this.getGames();
    } else {
      this.query = localStorage.getItem('query');
      this.pageTitle = "Wyniki wyszukiwania dla: " + this.query;
      this.games = JSON.parse(localStorage.getItem('games'));
      this.countGames = this.games.length;
      localStorage.setItem('games', null);
      localStorage.setItem('query', null);
    }
  }

}
