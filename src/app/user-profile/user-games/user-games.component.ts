import { Component, OnInit , ElementRef, Input} from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserGame } from './user-games';
import { AppService } from '../../app.service';
import { UserGameService } from './user-games.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.scss'],
  providers: [UserGameService, AppService]
})

export class UserGamesComponent implements OnInit {

  errorMessage: string;
  status: string;
  userGame: UserGame[];
  gameImgName: string;

  public URL = this.appService.getUrl('/app/coverUpload');
  public coverUploader:FileUploader = new FileUploader({url: this.URL, itemAlias: 'photo'});

  constructor (private http: Http, private el: ElementRef, private appService: AppService, private userGameService: UserGameService, private flashMessage:FlashMessagesService) {}

  ngOnInit() {
    this.getUserGame();
    this.coverUploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.coverUploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {};
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

    var createdDate = new Date().toString();

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
