import { Component, OnInit } from '@angular/core';
import { UserGame } from '../profile/user-games/user-games';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service';
import { PagerService } from '../pager.service';
import { CoreService } from '../core/core.service';
import { Router, CanActivate, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { ExchangeService } from './../exchange/exchange.service';
import { Exchange } from './../exchange/exchange';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css'],
  providers: [AppService, CoreService, PagerService, ExchangeService]
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

  currentUserGamesIds: Array<string>;  

  option = {
    name: '',
    value: '',
    checked: false
  };
  options: Array<{name: string,value: string,checked: boolean}>;

  // EXCHANGE
  exchange: Exchange;
  proposeGames = [];

  private sub: any;

  constructor(
    private appService: AppService, 
    private route: ActivatedRoute, 
    private coreService: CoreService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private http: Http, 
    private pagerService: PagerService,
    private exchangeService: ExchangeService
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      (params['title']) ? this.queryTitle = params['title'] : this.queryTitle = '';
      (params['category']) ? this.categories = params['category'].toString().split(',') : this.categories = null;
      (params['state']) ? this.states = params['state'].toString().split(',') : this.states = null;

      if(localStorage.getItem('currentUser')) {
        this.getCurrentUserGames();
      }

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

  start(game: string, userId: string) {

    this.currentUserGamesIds = [];
    for(var i = 0; i<this.options.length; i++) {
      if(this.options[i].checked == true) {
        this.currentUserGamesIds.push(this.options[i].value);
      }
    }

    this.appService.startTransaction(game, userId, this.currentUserGamesIds)
      .subscribe(response => {
        console.log(JSON.parse(localStorage.getItem('currentUser'))._id + " send");

      });
  }

  getCurrentUserGames() {
      var id = this.appService.getCurrentUser()._id;
      this.coreService.getUserGames(id)
      .subscribe(userGames => {
          this.options = [];

          for (var i =0; i< userGames.length; i++) {
            var option = {
              name: userGames[i].title,
              value: userGames[i].title,
              checked: false
            }
            this.options.push(option);
          }
      }, error => this.errorMessage = <any>error);
  }

  registerExchange(recipientGames: string, recipient: string){
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var sender = currentUser._id;
      var recipientGame = recipientGames;

      for(var i = 0; i<this.options.length; i++) {
        if(this.options[i].checked == true) {
          this.proposeGames.push(this.options[i].value);
        }
      }

      this.exchangeService.saveExchange(this.proposeGames, recipientGame, sender, recipient)
        .subscribe(exchange => {
                this.exchange = exchange
        }, error => this.errorMessage = <any>error); 
          
      //clear array 
      this.proposeGames.length = 0;  
  }

}
