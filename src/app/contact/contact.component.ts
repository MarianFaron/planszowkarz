import { Component, OnInit , ElementRef, Input} from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import { ContactMessage } from './contact-message'
import { ContactService } from './contact.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {

  errorMessage: string;
  contactMessage: ContactMessage;

  model = {
    subject: '',
    content: '',
    authorEmail: '',
    authorName: '',
    authorSurname: ''
  };

  constructor(
    private contactService: ContactService,
    private http: Http, 
    private appService: AppService
  ) { }

  ngOnInit() { }

  sendMessage(valid, subject, content, authorEmail, authorName, authorSurname) {
    if(!valid) {
      this.appService.showNotification('Powiadomienie', 'Popraw dane w formularzu.', 'danger');
      return;
    }
    else{
      this.contactService.registerApplication(subject, content, authorEmail, authorName, authorSurname)
                                              .subscribe(
                                                contactMessage  => {
                                                  this.contactMessage;
                                                  this.appService.showNotification('Powiadomienie', 'Wysłano zgłoszenie.', 'success');
                                                },
                                                error =>  {
                                                  this.errorMessage = <any>error
                                                });
    }
  }
}
