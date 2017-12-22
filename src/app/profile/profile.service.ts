import { Injectable, } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UserInfo } from './user-info/user-info';
import { UserInfoService } from './user-info/user-info.service';

@Injectable()
export class ProfileService {

  constructor (private userInfoService: UserInfoService) {}
  userInfo: UserInfo;

  updateUserInfo(date, city, contactNumber, avatarImgName) {
    this.userInfo.dateBirth = date;
    this.userInfo.city = city;
    this.userInfo.contactNumber = contactNumber;
    this.userInfo.avatarImage = avatarImgName;
  }

  getUserInfo() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var userID = currentUser._id;

    this.userInfoService.getUser(userID)
                     .subscribe(userInfo => {this.userInfo = userInfo;});
    return this.userInfo;
  }

}
