import { Component, OnInit , Input} from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { UserHistory } from './user-history';
import { AppService } from '../../app.service';
import { UserHistoryService } from './user-history.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

	constructor() { }

	ngOnInit() {}
}
