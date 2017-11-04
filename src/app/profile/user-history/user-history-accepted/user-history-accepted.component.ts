import { Component, OnInit , Input} from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserHistory } from '../user-history';
import { AppService } from '../../../app.service';
import { UserHistoryService } from '../user-history.service';
import { ChatService } from '../../../chat/chat.service';


@Component({
  selector: 'app-user-history-accepted',
  templateUrl: './user-history-accepted.component.html',
  styleUrls: ['../user-history.component.scss'],
  providers: [UserHistoryService, ChatService]
})
export class UserHistoryAcceptedComponent implements OnInit {

  	userHistory: UserHistory[];
	errorMessage: string;

  	constructor(private http: Http, private chatService: ChatService, private appService: AppService, private userHistoryService: UserHistoryService) { }

  	ngOnInit() {
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

  startChat(sender: string, recipient: string) {
    this.chatService.startChat(sender, recipient).subscribe(
      chat => {
        console.log('przenies do czatu');
        console.log(chat);
        window.location.replace('/chat/'+chat[0]._id);
      },
      error => this.errorMessage = <any>error);;
  }
}
