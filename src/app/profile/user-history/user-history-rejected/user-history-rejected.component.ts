import { Component, OnInit , ElementRef, Input} from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserHistory } from '../user-history';
import { AppService } from '../../../app.service';
import { UserHistoryService } from '../user-history.service';

@Component({
  selector: 'app-user-history-rejected',
  templateUrl: './user-history-rejected.component.html',
  styleUrls: ['../user-history.component.scss'],
  providers: [UserHistoryService]
})

export class UserHistoryRejectedComponent implements OnInit {

	userHistory: UserHistory[];
	errorMessage: string;

	currentUserID: string;

	constructor(private http: Http, private appService: AppService, private userHistoryService: UserHistoryService) { }

	ngOnInit() {
		this.getUserHistory();
	}

	getUserHistory() {

	  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	  this.currentUserID = currentUser._id;

	  this.userHistoryService.getHistoryExchanges(this.currentUserID)
	                    .subscribe(
	                      userHistory => {
													this.userHistory = userHistory;
													console.log(this.currentUserID);
													console.log(userHistory);
	                      },
	                      error => this.errorMessage = <any>error);
	}
}
