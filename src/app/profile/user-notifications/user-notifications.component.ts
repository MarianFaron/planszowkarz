import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { UserNotificationsService } from './user-notifications.service';
import { PagerService } from '../../pager.service';
import { UserNotification } from './user-notifications';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-notifications',
  templateUrl: './user-notifications.component.html',
  styleUrls: ['./user-notifications.component.scss'],
  providers: [AppService, UserNotificationsService, PagerService]
})

export class UserNotificationsComponent implements OnInit {

  // PAGER

  pager: any = {};
  pagedItems: any[];

  private notifications: UserNotification[];
  private errorMessage: string;

  constructor(private appService: AppService, private router: Router, private userNotificationsService: UserNotificationsService, private pagerService: PagerService) { }

  ngOnInit() {
    this.getNotifications();
  }

  changeStatus(id: string) {
    this.userNotificationsService.changeStatus(id)
      .subscribe(notifications => {
        this.notifications;
        this.getNotifications();
        this.appService.unread--;
      },
      error => this.errorMessage = <any>error);
  }

  getNotifications() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var userId = currentUser._id;

    this.userNotificationsService.getNotifications(userId)
      .subscribe(
        notifications => {
          this.notifications = notifications.notifications.reverse();
          this.setPage(1);
        },
        error => this.errorMessage = <any>error
      );

  }

  setPage(page: number) {
    this.router.navigate(['/profile/notifications'], {queryParams: {page: page}});
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.notifications.length, page);
    this.pagedItems = this.notifications.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
