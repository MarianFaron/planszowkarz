import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { UserNotificationsService } from './user-notifications.service';
import { UserNotification } from './user-notifications';

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss'],
  providers: [AppService, UserNotificationsService]
})

export class UserNotificationsComponent implements OnInit {

  private notifications: UserNotification[];
  private errorMessage: string;

  constructor(private appService: AppService, private userNotificationsService: UserNotificationsService) { }

  ngOnInit() {
    this.getNotifications();
  }

  changeStatus(id: string) {
    this.userNotificationsService.changeStatus(id).subscribe(
      notifications => {
        this.getNotifications();
      }
    );
  }

  getNotifications() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var userId = currentUser._id;

    this.userNotificationsService.getNotifications(userId)
      .subscribe(
        notifications => this.notifications = notifications.notifications,
        error => this.errorMessage = <any>error
      );
  }
}
