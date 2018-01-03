import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ChatService } from './chat.service';
import { ExchangeService } from '../exchange/exchange.service';
import { CoreService } from '../core/core.service';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from '../profile/user-info/user-info'
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [CoreService, ChatService, ExchangeService]
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService,private exchangeService: ExchangeService, private activeRoute: ActivatedRoute, private coreService: CoreService, public appService: AppService) { }

  myId: string;
  friendId: string;

  friend;
  chat;
  errorMessage: string;
  messages;
  content: string;
  chatId: string;
  private socket = null;
  chatContent;

  ngOnInit() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.myId = currentUser._id;
    this.chatId = this.activeRoute.snapshot.params['_id'];

    this.getChat(this.chatId);

    this.socket = this.appService.socket;
    this.socket.on('getMessage', function(data){
      this.getMessages(this.chatId);
      this.appService.showNotification('Powiadomienie', 'Masz nową wiadomość.', 'success');
    }.bind(this));

   }
   @ViewChild('chatContent') private myScrollContainer: ElementRef;

   scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }
    }

   getFriendName(friend: UserInfo) {
     this.friend = friend;
     if(friend.facebook) {
       this.friendId = friend.facebook.name;
     } else {
       this.friendId = friend.local.login;
     }
   }

   getChatfriend() {
     if(this.myId != this.chat.chat[0].user1) {
       this.chatService.getChatFriend(this.chat.chat[0].user1).subscribe(
           friend => { this.getFriendName(friend); },
           error => { this.errorMessage = <any>error; }
       );
     } else {
       this.chatService.getChatFriend(this.chat.chat[0].user2).subscribe(
           friend => { this.getFriendName(friend); },
           error => { this.errorMessage = <any>error; }
       );
     }
   }

   closeExchange(chatId: string, userId: string) {
     this.exchangeService.closeExchange(chatId, userId).subscribe(
       res => { window.location.replace('/profile/history/accepted'); },
       error => { this.errorMessage = <any>error; }
     );
   }

   getChat(chatId: string) {
     this.chatService.getChat(chatId)
                     .subscribe(
                         chat => {
                           this.chat = chat;
                           if(this.checkChatAccess(this.myId, chat) != true || chat.chat[0].status == 'closed') {
                             window.location.replace('/profile');
                           } else {
                             this.getChatfriend();
                             this.getMessages(this.chatId);
                             this.scrollToBottom();
                           }
                         },
                         error => {
                           this.errorMessage = <any>error;
                         }
                     );
   }

   checkChatAccess(userId, chat) {
     if(userId != chat.chat[0].user1 && userId != chat.chat[0].user2) {
       return false;
     } else {
       return true;
     }
   }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }



  getMessages(chatId: string) {
    this.chatService.getMessages(chatId)
                    .subscribe(
                        messages => {
                          this.messages = messages;
                          this.scrollToBottom();
                          },
                        error => {
                          this.errorMessage = <any>error;
                        }
                    );
  }

  sendMessage(content: string) {
    if(content != "") {
      this.chatService.sendMessage(this.chat.chat[0]._id, this.myId, this.friend._id, content)
          .map((response) => {
            this.getMessages(this.chat.chat[0]._id);
          })
          .subscribe(
            message  => {
              this.chatService.getMessages(this.chat.chat[0]._id);
              this.socket.emit('sendMessage', this.friend._id);
            },
            error => this.errorMessage = <any>error);
    }
  }
}
