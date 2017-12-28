import { Component, OnInit , Input} from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserHistory } from '../user-history';
import { AppService } from '../../../app.service';
import { OtherUserService } from '../../../other-user/other-user.service';
import { UserInfo } from '../../../profile/user-info/user-info';
import { UserHistoryService } from '../user-history.service';
import { ChatService } from '../../../chat/chat.service';
import { OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent } from 'angular-star-rating/star-rating-struct';


@Component({
  selector: 'app-user-history-accepted',
  templateUrl: './user-history-accepted.component.html',
  styleUrls: ['../user-history.component.scss'],
  providers: [OtherUserService,UserHistoryService, ChatService]
})
export class UserHistoryAcceptedComponent implements OnInit {

  userHistory: UserHistory[];
	errorMessage: string;
	userInfo: UserInfo;
	rate: OnClickEvent;
	currentUserID: string;
	currentUserName: string;
	exchangeId: string;
	whoRated: string;

	constructor(private http: Http, private chatService: ChatService, private appService: AppService, private userHistoryService: UserHistoryService, private otherUserService: OtherUserService) { }

	ngOnInit() {
		this.getUserHistory();
	}

	getUserInfo(login: string) {
    this.otherUserService.getUserInfo(login)
                     .subscribe(
                        userInfo => {
													this.userInfo = userInfo;
													this.subscribeGrade();
                        },
                        error => this.errorMessage = <any>error);
  }

	getUserHistory() {

	  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
	  this.currentUserID = currentUser._id;
		if(currentUser.facebook){
			this.currentUserName = currentUser.facebook.name;
		}else{
			this.currentUserName = currentUser.local.login;
		}
	  this.userHistoryService.getHistoryExchanges(this.currentUserID)
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
	addGrade(sender:string, recipient:string, gameId:string, $event:OnClickEvent){

		if(sender == this.currentUserName){
			this.getUserInfo(recipient);
			this.whoRated = "sender";
		}else{
			this.getUserInfo(sender);
			this.whoRated = "recipient";
		}
		this.exchangeId = gameId;
		this.rate = $event;

  }

  onHoverRatingChangeResult:OnHoverRatingChangeEvent;
	onClickResult:OnClickEvent;
	onHoverRatingChange = ($event:OnHoverRatingChangeEvent) => {
		this.onHoverRatingChangeResult = $event;
	};
	
	subscribeGrade(){
		var sumOfGrades = Number(this.userInfo.sumOfGrades) + Number(this.rate.rating);
		var numberOfRatings = this.userInfo.numberOfRatings+1;

		this.otherUserService.updateUser(this.userInfo._id, this.userInfo.dateBirth, this.userInfo.city, this.userInfo.contactNumber, this.userInfo.avatarImage,  
      this.userInfo.numberOfGames, this.userInfo.numberOfExchanges, numberOfRatings, sumOfGrades)
																																																.subscribe(
																																																userInfo  => {
																																																	this.userInfo;
																																																	this.appService.showNotification('Powiadomienie', 'Oceniono użytkownika.', 'success');
																																																},
																																																error =>  {
																																																	this.errorMessage = <any>error
																																																}
																																																);
	
		if(this.whoRated == "sender"){
			this.userHistoryService.senderRate(this.exchangeId, true)
								.subscribe(
									userHistory => {
	                        			this.userHistory;
	                        			this.getUserHistory();
	                      			},
	                      			error => this.errorMessage = <any>error);
		}else{
			this.userHistoryService.recipientRate(this.exchangeId, true)
								.subscribe(
									userHistory => {
	                        			this.userHistory;
	                        			this.getUserHistory();
	                      			},
	                      			error => this.errorMessage = <any>error);
		}									

		}
	
}

