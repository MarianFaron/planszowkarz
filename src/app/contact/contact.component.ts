import { Component, OnInit } from '@angular/core';
import { ContactMessage } from './contact-message'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }

  //contactMessage: ContactMessage;

  contactMessage = {
    subject: "Temat",
    content: "Treść",
    authorEmail: "mail@wp.pl",
    authorName: "Janek",
    authorSurname: "Kowalski"
  }

  sendMessage(valid, message) {
    if(!valid) {
      return;
    }
  }
  

}
