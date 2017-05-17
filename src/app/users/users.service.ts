import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppService } from '../app.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from './user';

@Injectable()
export class UsersService {

  //  ROUTES

  private usersUrl = this.appService.getUrl('/app/users');
  private userRegisterUrl = this.appService.getUrl('/app/users/register');
  private userLoginUrl = this.appService.getUrl('/app/users/login');
  private userLogoutUrl = this.appService.getUrl('/app/users/logout');
  private facebookLoginUrl = this.appService.getUrl('/app/auth/facebook');
  private forgotPasswordUrl = this.appService.getUrl('/app/forgot');

  constructor (private http: Http, private appService: AppService) {}

  // get Users
  
  getUsers(): Observable<User[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.usersUrl, options)
                    .map((response: Response) => response.json().users)
                    .catch(this.appService.handleError);
    }

  forgotPassword(email: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.forgotPasswordUrl, {email}, options)
                    .map((response: Response) => response.json())
                    .catch(this.appService.handleError);
  }

  // Facebook login

  fbLogin(): Observable<User[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.get(this.facebookLoginUrl, options)
                    .map((response: Response) => {
                       if (response.json().user) {
                           return true;
                       } else {
                           return false;
                       }
                   })
                    .catch(this.appService.handleError);
  }

  // Login user

  login(email: string, password: string) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.userLoginUrl, {email, password}, options)
                    .map((response: Response) => {
                      if (response.json().message) {
                        return {message: response.json().message};
                     } else if (response.json().user) {
                        localStorage.setItem('currentUser', JSON.stringify(response.json().user));
                        return {user: response.json().user};
                     } else {
                        return false;
                     }
                    })
                    .catch(this.appService.handleError);

  }

  // Logout user

  logout(): Observable<User[]> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.userLogoutUrl, options)
                    .map(this.appService.extractData)
                    .catch(this.appService.handleError);
  }

  // Register user

  register(login: string, email: string, password: string, avatarImage: string) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});

    return this.http.post(this.userRegisterUrl, {login, email, password, avatarImage}  , options)
                    .map((response: Response) => {
                      if(response.json().message) {
                        return {message: response.json().message};
                      } else if (response.json().user) {
                        return {user: response.json().user};
                      } else {
                        return false;
                      }
                    })
                    .catch(this.appService.handleError);

  }

}
