import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserHistory } from '../user-history';
import { AppService } from '../../../app.service';
import { UserHistoryService } from '../user-history.service';

@Component({
  selector: 'app-user-history-received',
  templateUrl: './user-history-received.component.html',
  styleUrls: ['../user-history.component.scss'],
  providers: [UserHistoryService]
})
export class UserHistoryReceivedComponent implements OnInit {

  userHistory: UserHistory[];
	errorMessage: string;
	status: string;
	senderGame = "";

	constructor(private http: Http, private appService: AppService, private userHistoryService: UserHistoryService) { }

	ngOnInit() {
		this.getUserHistory();
	}

	getUserHistory() {

	  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	  var userID = currentUser._id;

	  this.userHistoryService.getReceivedHistoryExchanges(userID)
	                    .subscribe(
	                      userHistory => {
	                        this.userHistory = userHistory;
	                      },
	                      error => this.errorMessage = <any>error);
	}

	discardExchange(id: string, sender: Object){
		this.status = "rejected";
		this.userHistoryService.saveDiscardExchane(id, this.status, sender, this.appService.getCurrentUser())
								.subscribe(
									userHistory => {
	                        			this.userHistory;
	                        			this.getUserHistory();
	                      			},
	                      			error => this.errorMessage = <any>error);
		this.appService.showNotification('Powiadomienie', 'Wymiana została odrzucona', 'success');
	}

	acceptExchange(id: string, sender: Object){
		if (this.senderGame == ""){
			this.appService.showNotification('Powiadomienie', 'Wybierz grę', 'danger');
		}
		else{
			this.status = "accepted";

			this.userHistoryService.saveAcceptExchange(id, this.senderGame, this.status, sender, this.appService.getCurrentUser())
									.subscribe(
										userHistory => {
		                        			this.userHistory;
		                        			this.getUserHistory();
		                      			},
		                      			error => this.errorMessage = <any>error);
			this.appService.showNotification('Powiadomienie', 'Wymiana została zaakceptowana', 'success');
			this.senderGame = "";
		}
	}
}
