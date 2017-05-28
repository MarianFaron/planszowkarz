import { Component, OnInit , ElementRef, Input} from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserHistory } from './user-history';
import { AppService } from '../../app.service';
import { UserHistoryService } from './user-history.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

	userHistory: UserHistory[];
	errorMessage: string;

	constructor(private http: Http, private appService: AppService, private userHistoryService: UserHistoryService) { }

	ngOnInit() {
		this.getUserHistory();
	}

	getUserHistory() {

	  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	  var userID = currentUser._id;

	  this.userHistoryService.getHistoryExchanges(userID)
	                    .subscribe(
	                      userHistory => {
	                        this.userHistory;
	                      },
	                      error => this.errorMessage = <any>error);
	}
}
