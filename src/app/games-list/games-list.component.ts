import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { PagerService } from '../pager.service';
import { CoreService } from '../core/core.service';
import { AppService } from '../app.service';
import { UserGame } from '../profile/user-games/user-games';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss'],
  providers: [AppService, CoreService, PagerService]
})
export class GamesListComponent implements OnInit {

  // PAGER

  pager: any = {};
  pagedItems: any[];

  // QUERY PARAMS

  queryTitle: string;

  categoriesOptions = [
    {name: "Strategiczna", value: "Strategiczna", checked: false},
    {name: "Logiczna", value: "Logiczna", checked: false},
    {name: "Ekonomiczna", value: "Ekonomiczna", checked: false},
    {name: "Imprezowa", value: "Imprezowa", checked: false},
    {name: "Karciana", value: "Karciana", checked: false},
    {name: "Figurkowa", value: "Figurkowa", checked: false},
    {name: "Przygodowa", value: "Przygodowa", checked: false},
    {name: "Rodzinna", value: "Rodzinna", checked: false},
    {name: "Zręcznościowa", value: "Zręcznościowa", checked: false}
  ];

  statesOptions = [
    {name: "Nowa", value: "Nowa", checked: false},
    {name: "Używana", value: "Używana", checked: false}
  ]

  query = {
    title: "",
    category: null,
    state: null
  };

  // GENERAL

  games: UserGame[];
  countGames: number;
  pageTitle: string;
  categories: string[];
  states: string[];
  errorMessage: string;
  userGame: UserGame[];
  pageUrl = '/games';

  private sub: any;

  constructor(
    private appService: AppService, 
    private route: ActivatedRoute, 
    private coreService: CoreService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private http: Http, 
    private pagerService: PagerService,
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      (params['title']) ? this.queryTitle = params['title'] : this.queryTitle = '';
      (params['category']) ? this.categories = params['category'].toString().split(',') : this.categories = null;
      (params['state']) ? this.states = params['state'].toString().split(',') : this.states = null;

      this.query = {
        title: this.queryTitle,
        category: this.categories,
        state: this.states
      }

      this.updateCheckboxes();

      if (this.query.title == '' && this.query.category == null && this.query.state == null) {
        this.router.navigate(['/games']);
        this.pageTitle = "Wymiana gier";
        this.getGames();
      } else {
        this.pageUrl = '/search-results';
        this.queryTitle = this.query.title;
        this.games = JSON.parse(localStorage.getItem('games'));
        this.setPageTitle();
        this.setPage(1);
        this.router.navigate([this.pageUrl], {queryParams: this.query});
      }
    });
  }

  searchTitle(queryTitle: string) {
    this.query.title = queryTitle;

    this.appService.search(this.query)
                        .subscribe(
                          games => {
                            this.games = games;
                            localStorage.setItem('games', JSON.stringify(games));
                            localStorage.setItem('query', JSON.stringify(this.query));
                            this.router.navigate(['search-results'], {queryParams: this.query});
                          },
                          error => {
                            this.errorMessage = <any>error;
                          });
  }

  search(query: {title: string, category: string, state: string}) {
    var localQuery = query;
    this.appService.search(query)
                        .subscribe(
                          games => {
                            var query = localQuery;
                            localStorage.setItem('games', JSON.stringify(games));
                            localStorage.setItem('query', JSON.stringify(localQuery));

                            var title = '', categories = '', states = '';

                            if(this.query.title != "") {
                              title = ''+this.query.title;
                            }

                            if(this.query.category.length > 0) {
                              for(var i = 0; i < this.query.category.length; i++) {
                                (i == this.query.category.length-1) ? categories += this.query.category[i]: categories += this.query.category[i] + ','
                              }
                            }

                            if(this.query.state.length > 0) {
                              for(var i = 0; i < this.query.state.length; i++) {
                                (i == this.query.state.length-1) ? states += this.query.state[i]: states += this.query.state[i] + ','
                              }
                            }

                            var query = {
                              title: title,
                              category: categories,
                              state: states
                            }
                            this.games = games.reverse();
                            this.query = query;
                            this.router.navigate(['search-results'], {queryParams: query});
                          },
                          error => {
                            this.errorMessage = <any>error;
                          });
  }


  updateOptions() {

    this.categories = [];
    this.states = [];

    for(var i = 0; i<this.categoriesOptions.length; i++) {
      if(this.categoriesOptions[i].checked == true) {
        this.categories.push(this.categoriesOptions[i].value);
      }
    }

    for(var i = 0; i<this.statesOptions.length; i++) {
      if(this.statesOptions[i].checked == true) {
        this.states.push(this.statesOptions[i].value);
      }
    }

    this.query = {
      "title": this.queryTitle,
      "category": this.categories,
      "state": this.states
    }
    this.search(this.query);
  }

  getGames() {
    this.coreService.getGames()
                    .subscribe(
                        games => {
                          this.games = games;
                          this.setPage(1);
                        },
                        error => this.errorMessage = <any>error
                    );
  }

  setPageTitle() {
      this.countGames = this.games.length;
      if(this.queryTitle != "") {
        this.pageTitle = this.countGames+ " Wyników wyszukiwania dla: " + this.queryTitle;
      } else {
        this.pageTitle = this.countGames+ " Wyników wyszukiwania";
      }
  }

  updateCheckboxes() {
    if(this.categories != null) {
      for(var i = 0; i < this.categories.length; i++) {
        for(var j = 0; j < this.categoriesOptions.length; j++) {
          if(this.categories[i] == this.categoriesOptions[j].value) {
            this.categoriesOptions[j].checked = true;
          }
        }
      }
    }

    if(this.states != null) {
      for(var i = 0; i < this.statesOptions.length; i++) {
        for(var j = 0; j < this.statesOptions.length; j++) {
          if(this.states[i] == this.statesOptions[j].value) {
            this.statesOptions[j].checked = true;
          }
        }
      }
    }
  }

  setPage(page: number) {
    this.pager = this.pagerService.getPager(this.games.length, page);
    this.pagedItems = this.games.slice(this.pager.startIndex, this.pager.endIndex + 1);
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
  }
}