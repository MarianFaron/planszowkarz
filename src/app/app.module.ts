import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { CoreComponent } from './core/core.component';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { FileSelectDirective } from 'ng2-file-upload';
import { UserInfoComponent } from './profile/user-info/user-info.component';
import { UserGamesComponent } from './profile/user-games/user-games.component';
import { EqualValidator } from './users/equal-validator.directive';
import { OtherUserComponent } from './other-user/other-user.component'
import { MyDatePickerModule } from 'mydatepicker';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GamesListComponent } from './games-list/games-list.component';
import { UserNotificationsComponent } from './profile/user-notifications/user-notifications.component';
import { UserConfigComponent } from './profile/user-config/user-config.component';
import { UserNavbarComponent } from './profile/user-navbar/user-navbar.component';
import { UserHistoryComponent } from './profile/user-history/user-history.component';
import { UserHistoryFilterPipe } from './profile/user-history/user-history.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    CoreComponent,
    UsersComponent,
    FileSelectDirective,
    UserInfoComponent,
    UserGamesComponent,
    EqualValidator,
    OtherUserComponent,
    GameDetailsComponent,
    GamesListComponent,
    UserNotificationsComponent,
    UserConfigComponent,
    UserNavbarComponent,
    UserHistoryComponent,
    UserHistoryFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    FlashMessagesModule,
    MyDatePickerModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pl-PL" }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
