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
  queryCategories: string[];
  queryStates: string[];

  query = {
    title: "",
    category: null,
    state: null
  };

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

  // GENERAL

  games: UserGame[];
  pageTitle: string;
  errorMessage: string;
  userGame: UserGame[];

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

    this.queryCategories = [];
    this.queryStates = [];

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      (params['title']) ? this.query.title = params['title'] : this.query.title = '';
      (params['category']) ? this.query.category = params['category'].toString().split(',') : this.query.category = null;
      (params['state']) ? this.query.state = params['state'].toString().split(',') : this.query.state = null;

      // this.updateCheckboxes();
      this.checkPageMode();

    });
  }

  search() {

    this.getCategoriesCheckboxesValues();
    this.getStatesCheckboxesValues();
    this.updateQueryValues();

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

    this.resetQueryValues();

  }

  getGames() {
    this.coreService.getAllGames()
                    .subscribe(
                        games => {
                          this.games = games;
                          this.setPage(1);
                        },
                        error => this.errorMessage = <any>error
                    );
  }

  resetQueryValues() {
    this.queryCategories = [];
    this.queryStates = [];
    this.queryTitle = "";
  }

  updateQueryValues() {
    (this.queryCategories.length == 0) ? this.query.category = null : this.query.category = this.queryCategories;
    (this.queryStates.length == 0) ?  this.query.state = null : this.query.state = this.queryStates;
    (this.queryTitle == undefined) ? this.query.title = "" : this.query.title = this.queryTitle;
  }

  checkPageMode() {
    if (this.query.title == '' && this.query.category == null && this.query.state == null) {
      this.router.navigate(['/games']);
      this.pageTitle = "Wymiana gier";
      this.getGames();
    } else {
      this.games = JSON.parse(localStorage.getItem('games'));
      this.pageTitle = this.games.length + " Wyników wyszukiwania dla: ";
      this.setPage(1);
      this.router.navigate(['/search-results'], {queryParams: this.query});
    }
  }

  getCategoriesCheckboxesValues() {
    for(var i = 0; i<this.categoriesOptions.length; i++) {
      if(this.categoriesOptions[i].checked == true) {
        this.queryCategories.push(this.categoriesOptions[i].value);
      }
    }
  }

  getStatesCheckboxesValues() {
    for(var i = 0; i<this.statesOptions.length; i++) {
      if(this.statesOptions[i].checked == true) {
        this.queryStates.push(this.statesOptions[i].value);
      }
    }
  }

  updateCheckboxes() {
    if(this.queryCategories != null) {
      for(var i = 0; i < this.queryCategories.length; i++) {
        for(var j = 0; j < this.categoriesOptions.length; j++) {
          if(this.queryCategories[i] == this.categoriesOptions[j].value) {
            this.categoriesOptions[j].checked = true;
          }
        }
      }
    }

    if(this.queryStates != null) {
      for(var i = 0; i < this.statesOptions.length; i++) {
        for(var j = 0; j < this.statesOptions.length; j++) {
          if(this.queryStates[i] == this.statesOptions[j].value) {
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
