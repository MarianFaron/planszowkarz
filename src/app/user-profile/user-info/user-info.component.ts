import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserInfoService } from './user-info.service';
import { UserInfo } from './user-info';
import { FlashMessagesService } from 'angular2-flash-messages';
import { IMyOptions} from 'mydatepicker';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  providers: [UserInfoService]
})


export class UserInfoComponent implements OnInit {

  errorMessage: string;
  status: string;
  userInfo: UserInfo;

  currentDate = new Date();

  constructor(private http: Http, private userInfoService: UserInfoService, private flashMessage:FlashMessagesService) { }

  private myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd-mm-yyyy',
        showTodayBtn: false,
        maxYear: this.currentDate.getFullYear()
    };

    model = {
      login: '',
      surname: '',
      datepicker: { date: {year: 2000, month: 1, day: 1 }},
      dateBirth: '',
      city: '',
      contactNumber: '',
    }

  ngOnInit() {
    this.getUserInfo();
  }

  //get user information

  getUserInfo() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var userID = currentUser._id;

    this.userInfoService.getUser(userID)
                     .subscribe(
                        userInfo => {
                          this.userInfo = userInfo;
                          this.model.dateBirth = userInfo.dateBirth;
                        },
                        error => this.errorMessage = <any>error);
  }

  //edit user information

  editUserInfo(id: string, login: string, surName: string, city: string, contactNumber: string) {

    var d = this.model.datepicker.date.year;
    var m =this.model.datepicker.date.month;
    var y = this.model.datepicker.date.day;
    var date = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

    this.userInfoService.updateUser(id, login, surName, date, city, contactNumber)
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
