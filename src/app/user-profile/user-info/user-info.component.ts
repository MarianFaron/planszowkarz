import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserInfoService } from './user-info.service';
import { UserInfo } from './user-info';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  providers: [UserInfoService]
})
export class UserInfoComponent implements OnInit {

  errorMessage: string;
  status: string;
  userInfo: UserInfo[];

  constructor(private http: Http, private userInfoService: UserInfoService, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  //get user information

  getUserInfo() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var userID = currentUser._id;

    this.userInfoService.getUser(userID)
                     .subscribe(
                        userInfo => this.userInfo = userInfo,
                        error => this.errorMessage = <any>error);
  }

  //edit user information

  editUserInfo(id: string, login: string, surName: string, dateBirth: string, city: string, contactNumber: string) {
    this.userInfoService.updateUser(id, login, surName, dateBirth, city, contactNumber)
                     .subscribe(
                        userInfo  => {
                          this.userInfo;
                          this.getUserInfo();
                          this.flashMessage.show('Dane użytkownika zostały zmienione.', {cssClass: 'alert-success', timeout: 3000});
                        },
                        error =>  {
                          this.errorMessage = <any>error
                        });
  }
}