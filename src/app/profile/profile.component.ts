import { Component, OnInit } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserGamesComponent } from './user-games/user-games.component';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from './user-info/user-info';
import { UserInfoService } from './user-info/user-info.service';
import { ProfileService } from './profile.service';

const URL = 'https://planszowakrz.pl/app/uploads';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService, UserInfoService]
})

export class ProfileComponent implements OnInit {

	constructor(private route: ActivatedRoute, private profileService: ProfileService, private userInfoService: UserInfoService){}

	ngOnInit() {
    this.profileService.userInfo = this.profileService.getUserInfo();
  }
}
