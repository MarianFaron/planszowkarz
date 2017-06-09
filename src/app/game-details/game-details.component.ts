import { Component, OnInit, Input } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { GameDetails } from './game-details';
import { AppService } from '../app.service';
import { GameDetailsService } from './game-details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss'],
  providers: [GameDetailsService, AppService]
})
export class GameDetailsComponent implements OnInit {

  errorMessage: string;
  status: string;
  gameDetails: GameDetails;

  constructor( private http: Http,
               private gameDetailsService: GameDetailsService,
               private appService: AppService,
               private activeRoute: ActivatedRoute) {}

  ngOnInit() {

    let id = this.activeRoute.snapshot.params['_id'];

    this.gameDetailsService.getGame(id)
                           .subscribe(
                             gameDetails => this.gameDetails = gameDetails,
                          	 error => this.errorMessage = <any>error
                           );
   }

   start(game: string, userId: string) {
     this.appService.startTransaction(game, userId, [])
       .subscribe(response => {
         this.appService.showNotification('Powiadomienie', 'Wysłano prośbę o wymiane.', 'success');
       });
   }
}
