import { Component, ElementRef, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserConfigService } from './user-config.service';
import { AppService } from '../../app.service';
import { ProfileService } from '../profile.service';
import { UserInfo } from '../user-info/user-info';
import { UserInfoService } from '../user-info/user-info.service';
import { UserInfoComponent } from '../user-info/user-info.component';
import { IMyOptions} from 'mydatepicker';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';


@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss'],
  providers: [UserConfigService, AppService, UserInfoService]
})

export class UserConfigComponent implements OnInit {

  errorMessage: string;
  status: string;
  userInfo: UserInfo;
  avatarImgName: string;
  currentDate = new Date();

  public URL = this.appService.getUrl('/app/avatarUpload');

  constructor(private http: Http,
              private el: ElementRef,
              private appService: AppService,
              private profileService: ProfileService,
              private userInfoService: UserInfoService,
              private userConfigService: UserConfigService) { }

  myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd-mm-yyyy',
        showTodayBtn: false,
        maxYear: this.currentDate.getFullYear()
    };

    model = {
      datepicker: { date: {year: 2000, month: 1, day: 1 }},
      dateBirth: '',
      city: '',
      contactNumber: '',
      password: '',
      confirmPassword: '',
      numberOfGames: 0,
      numberOfExchanges: 0,
      numberOfRatings: 0,
      sumOfGrades: 0
    }

  ngOnInit() {
    this.getUserInfo();
    this.checkFbUser();
  }

  urlEditedUserImage: any;

  showEditAvatarThumbnail(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
        this.urlEditedUserImage = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  public avatarUploader:FileUploader = new FileUploader({url: this.URL, itemAlias: 'photo'});
  onChange(event: EventTarget) {

    this.avatarUploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.avatarUploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {};

    let file: File;
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    file = files[0];
    this.avatarImgName = file.name;

  }

  checkFbUser() {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if(user.facebook) {
      return false;
    } else {
      return true;
    }
  }

  //get user information

  getUserInfo() {

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var userID = currentUser._id;

    this.userConfigService.getUser(userID)
                     .subscribe(
                        userInfo => {
                          if(userInfo.dateBirth != null) {
                            this.model.datepicker = {
                              date: {
                                year: parseInt(userInfo.dateBirth.substring(6,10)),
                                month: parseInt(userInfo.dateBirth.substring(4,5)),
                                day: parseInt(userInfo.dateBirth.substring(0,2))
                              }
                            }
                          }
                          this.userInfo = userInfo;
                          this.model.dateBirth = userInfo.dateBirth;
                        },
                        error => this.errorMessage = <any>error);
  }

  //edit user information

  editUserInfo(valid, id: string, city: string, contactNumber: string, avatarImage: string, password: string, confirmPassword: string) {

    var d = this.model.datepicker.date.year;
    var m = this.model.datepicker.date.month;
    var y = this.model.datepicker.date.day;
    var date = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);

    // edit user data without change user's avatar

    if(avatarImage == ""){
      this.avatarImgName = this.userInfo.avatarImage;
    }

    if(password === confirmPassword) {

      if(this.appService.getCurrentUser().facebook) {
        password = '';
      }

      this.userConfigService.updateUser(id, date, city, contactNumber, this.avatarImgName, password,
                                        this.userInfo.numberOfGames, this.userInfo.numberOfExchanges,
                                        this.userInfo.numberOfRatings, this.userInfo.sumOfGrades, true)
                            .subscribe(
                              userInfo  => {
                                  this.userInfo;
                                  this.getUserInfo();
                                  this.appService.showNotification('Powiadomienie', 'Dane użytkownika zostały zmienione.', 'success');
                                  this.avatarUploader.uploadAll();
                                  setTimeout(() => {
                                    this.avatarUploader.clearQueue();
                                  }, 250);
                                  this.urlEditedUserImage = '';
                              },
                              error => {
                                  this.errorMessage = <any>error
                              }
                            );
      setTimeout(() => {
        this.profileService.updateUserInfo(date, city, contactNumber, this.avatarImgName);
      }, 250);      
    }
    else {
      this.appService.showNotification('Powiadomienie', 'Popraw dane w formularzu.', 'danger');
    }
  }
}
