import { Component, OnInit , Input} from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserHistory } from '../user-history';
import { AppService } from '../../../app.service';
import { UserHistoryService } from '../user-history.service';

@Component({
  selector: 'app-user-history-sended',
  templateUrl: './user-history-sended.component.html',
  styleUrls: ['../user-history.component.css'],
  providers: [UserHistoryService]
})
export class UserHistorySendedComponent implements OnInit {

  	userHistory: UserHistory[];
	errorMessage: string;
	loggedUserID: string;
	senderFilter: any;

  	constructor(private http: Http, private appService: AppService, private userHistoryService: UserHistoryService) { 
  		this.senderFilter = {sender: '59204a073642ea1ddcf685a0', status: 'pending'};
  	}

  	ngOnInit() {
  		var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	  	var loggedUserID = currentUser._id;
  		this.getUserHistory();
  	}

	getUserHistory() {

	  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	  var userID = currentUser._id;

	  this.userHistoryService.getHistoryExchanges(userID)
	                    .subscribe(
	                      userHistory => {
	                        this.userHistory = userHistory;
	                      },
	                      error => this.errorMessage = <any>error);
	}
}
