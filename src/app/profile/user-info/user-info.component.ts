import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserInfoService } from './user-info.service';
import { AppService } from '../../app.service';
import { UserInfo } from './user-info';
import { FlashMessagesService } from 'angular2-flash-messages';
import { IMyOptions} from 'mydatepicker';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  providers: [UserInfoService, AppService]
})


export class UserInfoComponent implements OnInit {

  errorMessage: string;
  status: string;
  userInfo: UserInfo;
  avatarImgName: string;
  currentDate = new Date();

  public URL = this.appService.getUrl('/app/avatarUpload');
  public avatarUploader:FileUploader = new FileUploader({url: this.URL, itemAlias: 'photo'});

  constructor(private http: Http, private appService: AppService, private userInfoService: UserInfoService, private flashMessage:FlashMessagesService) {
}

  private myDatePickerOptions: IMyOptions = {
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
      confirmPassword: ''
    }

  ngOnInit() {
    this.getUserInfo();
    this.avatarUploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.avatarUploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {};
  }

  file: File;
  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    this.avatarImgName = this.file.name;
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

}
