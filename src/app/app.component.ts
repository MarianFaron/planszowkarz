import { Component } from '@angular/core';
import { UsersService } from './users/users.service';
import { User } from './users/user';
import { AuthGuard } from './guards/auth.guard';
import { Router, CanActivate, ActivatedRoute } from '@angular/router'
import { AppService } from './app.service';

import { UserGame } from './profile/user-games/user-games';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.scss'],
  providers: [UsersService, AuthGuard, AppService]
})
export class AppComponent  {

  title = 'Planszówkarz';
  currentUser;
  notificationsCount ='0';
  errorMessage: string;
  games: UserGame[];
  user: User[];

  query = {
    title: '',
    category: null,
    state: null
  }

  private sub: any;

  constructor(private router: Router, private userGameService: UsersService, private appService: AppService, private authGuard: AuthGuard, private route: ActivatedRoute) {}

  logout() {
    this.userGameService.logout()
                        .subscribe(
                        user => this.user,
                        error => this.errorMessage = <any>error);
    localStorage.clear();
    window.location.reload();
  }

  search(queryTitle: string) {
    this.query.title = queryTitle;

    this.appService.search(this.query)
                        .subscribe(
                          games => {
                            this.games = games;
                            localStorage.setItem('games', JSON.stringify(games));
                            localStorage.setItem('query', JSON.stringify(this.query));
                            this.router.navigate(['search-results'], {queryParams: this.query});
                          },
                          error => {
                            this.errorMessage = <any>error;
                          });
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      if(params['userId']) {
          this.appService.getUser(params['userId'])
                            .subscribe(
                              user => {
                                window.location.reload();
                                this.router.navigate(['/profile']);
                              },
                              error => this.errorMessage = <any>error);
      }
    });
    if(localStorage.getItem('currentUser')) {
      this.currentUser = localStorage.getItem('currentUser');
      this.appService.getUnreadNotifications(JSON.parse(this.currentUser)._id).subscribe(
        notifications => {
          this.notificationsCount = localStorage.getItem('notificationsCount');
          localStorage.setItem('notificationsCount', null);
        }
      );
    } else {
      this.currentUser = null;
    }
  }

}
