import { Component, OnInit } from '@angular/core';
import { UserGame } from '../profile/user-games/user-games';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service';
import { PagerService } from '../pager.service';
import { CoreService } from '../core/core.service';
import { Router, CanActivate, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
  providers: [AppService, CoreService, PagerService]
})
export class GamesListComponent implements OnInit {

  private allItems: any[];
  pager: any = {};
  pagedItems: any[];

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

  constructor(private appService: AppService, private coreService: CoreService, private router: Router, private http: Http, private pagerService: PagerService) { }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.games.length, page);
    this.pagedItems = this.games.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getGames() {
    this.coreService.getGames()
                    .subscribe(
                        games => {
                          this.games = games.reverse();
                          this.allItems = games.reverse();
                          this.setPage(1);
                        },
                        error => this.errorMessage = <any>error
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

    if (localStorage.getItem('games') == 'null') {
      this.router.navigate(['/games']);
      this.pageTitle = "Wymiana gier";
      this.getGames();
    } else {
      this.query = localStorage.getItem('query');
      this.pageTitle = "Wyniki wyszukiwania dla: " + this.query;
      this.games = JSON.parse(localStorage.getItem('games'));
      this.setPage(1);
      this.countGames = this.games.length;
      localStorage.setItem('games', null);
      localStorage.setItem('query', null);
    }
  }

}
