import { Component, OnDestroy } from '@angular/core';
import { UsersService } from './users/users.service';
import { User } from './users/users';
import { AuthGuard } from './guards/auth.guard';
import { Router, CanActivate, ActivatedRoute } from '@angular/router'
import { AppService } from './app.service';
import * as io from 'socket.io-client';
import { UserGame } from './profile/user-games/user-games';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UsersService, AuthGuard, AppService]
})
export class AppComponent implements OnDestroy {

  title = 'Planszówkarz';
  currentUser;
  notificationsCount ='0';
  errorMessage: string;
  games: UserGame[];
  user: User[];
  mobileNavbar = false;
  public isCollapsed:boolean = true;

  public collapsed(event:any):void {
    
  }

  public expanded(event:any):void {
    
  }
  query = {
    title: '',
    category: null,
    state: null
  }

  private sub: any;

  constructor(private router: Router, private userGameService: UsersService, private appService: AppService, private authGuard: AuthGuard, private route: ActivatedRoute) {  }

  logout() {
    this.userGameService.logout()
                        .subscribe(
                        user => this.user,
                        error => this.errorMessage = <any>error);
    localStorage.clear();
    window.location.reload();
    this.router.navigate(['']);
    
  }



  ngOnInit() {
    AOS.init();
    this.sub = this.route.queryParams.subscribe(params => {
      if(params['userId']) {
          this.appService.getUser(params['userId'])
                            .subscribe(
                              user => {
                                window.location.href = '/profile';
                              },
                              error => this.errorMessage = <any>error);
      }
    });
    if(this.appService.isLoggedIn()) {
      this.currentUser = localStorage.getItem('currentUser');
      this.appService.getUnreadNotifications(this.appService.getCurrentUser()._id).subscribe(
        notifications => {this.notificationsCount = localStorage.getItem('notificationsCount');}
      );
    } else {
      this.currentUser = null;
    }
  }

  ngOnDestroy() {
    this.appService.socket.emit('disconnect');
  }

  toggleMobileNavbar(){
    if(this.mobileNavbar){
      this.mobileNavbar = false;
    }
    else{
      this.mobileNavbar = true;
    }
  }

}
