import { Component } from '@angular/core';
import { UsersService }       from './users/users.service';
import { User }              from './users/user';
import { AuthGuard }              from './guards/auth.guard';
import { Router, CanActivate, ActivatedRoute } from '@angular/router'
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsersService, AuthGuard, AppService]
})
export class AppComponent  {

  title = 'Planszówkarz';
  currentUser;
  errorMessage: string;
  user: User[];

  private sub: any;
  
  constructor(private router: Router, private userGameService: UsersService, private appService: AppService, private authGuard: AuthGuard, private route: ActivatedRoute) {}

  logout() {
    console.log(this.authGuard.canActivate());
    this.userGameService.logout()
                        .subscribe(
                        user => this.user,
                        error => this.errorMessage = <any>error);

    localStorage.clear();
    window.location.reload();
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      if(params['userId']) {
          this.appService.getUser(params['userId'])
                            .subscribe(
                              user => {
                                window.location.reload();
                                this.router.navigate(['/user-games']);
                              },
                              error => this.errorMessage = <any>error);
      }
    });
    if(localStorage.getItem('currentUser')) {
      this.currentUser = localStorage.getItem('currentUser');
    } else {
      this.currentUser = null;
    }
  }

}
