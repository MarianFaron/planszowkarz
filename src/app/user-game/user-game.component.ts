import { Component, OnInit , ElementRef, Input} from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserGame }              from './user-game';
import { UserGameService }       from './user-game.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:8080/app/uploads';

@Component({
  selector: 'app-user-game',
  templateUrl: './user-game.component.html',
  styleUrls: ['./user-game.component.css'],
  providers: [UserGameService]
})

export class UserGameComponent implements OnInit {

  errorMessage: string;
  status: string;
  userGame: UserGame[];
  mode = 'Observable';
  gameImgName: string;

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  constructor (private http: Http, private el: ElementRef, private userGameService: UserGameService, private flashMessage:FlashMessagesService) {}

  ngOnInit() {
    this.getUserGame();
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
  }

  file: File;
  onChange(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    this.gameImgName = this.file.name;
  }


  addUserGame(title: string, category: string, state: string, description: string,  gameImage: string) {

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var userID = currentUser._id;

    var currentDate = new Date();
    var createdDate = currentDate.getFullYear().toString() + '-' + 
               ('0' + (currentDate.getMonth()+1).toString()).slice(-2) + '-' +
               ('0' + (currentDate.getDate()).toString()).slice(-2);

    if (!title || !description || !category || !state) { return; }
    this.userGameService.create(title, category, state, description, createdDate, userID, this.gameImgName)
                     .subscribe(
                        userGame  => {
                          this.userGame;
                          this.getUserGame();
                          this.flashMessage.show('Dodano nową grę.', {cssClass: 'alert-success', timeout: 3000});
                        },
                        error =>  {
                          this.errorMessage = <any>error
                        });
  }


  editUserGame(id: string, title: string, category: string, state: string, description: string, modifiedDate: string, gameImage: string) {

    var currentDate = new Date();
    var modifiedDate = currentDate.getFullYear().toString() + '-' + 
               ('0' + (currentDate.getMonth()+1).toString()).slice(-2) + '-' +
               ('0' + (currentDate.getDate()).toString()).slice(-2);

    this.userGameService.update(id, title, category, state, description, modifiedDate, this.gameImgName)
                     .subscribe(
                        userGame => {
                          this.userGame;
                          this.getUserGame();
                          this.flashMessage.show('Zapisano zmiany.', {cssClass: 'alert-success', timeout: 3000});
                        },
                        error =>  {
                          this.errorMessage = <any>error
                        });
  }

  removeUserGame(id: string) {
    this.userGameService.delete(id)
                     .subscribe(
                        userGame  => {
                          this.userGame;
                          this.getUserGame();
                          this.flashMessage.show('Gra została usunięta.', {cssClass: 'alert-success', timeout: 3000});
                        },
                        error => {
                          this.errorMessage = <any>error
                        });
  }

  getUserGame() {

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var userID = currentUser._id;

    this.userGameService.getGames(userID)
                      .subscribe(
                        userGame => this.userGame = userGame.reverse(),
                        error => this.errorMessage = <any>error);
  }
}
