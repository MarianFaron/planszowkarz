import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CoreComponent } from './core/core.component';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './guards/auth.guard';
import { FileSelectDirective } from 'ng2-file-upload';
import { UserInfoComponent } from './user-profile/user-info/user-info.component';
import { UserGamesComponent } from './user-profile/user-games/user-games.component';
import { EqualValidator } from './users/equal-validator.directive';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OtherUserComponent } from './other-user/other-user.component'
import { MyDatePickerModule } from 'mydatepicker';
import { GameDetailsComponent } from './game-details/game-details.component';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    CoreComponent,
    UsersComponent,
    FileSelectDirective,
    UserInfoComponent,
    UserGamesComponent,
    EqualValidator,
    NavBarComponent,
    OtherUserComponent,
    GameDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    FlashMessagesModule,
    MyDatePickerModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pl-PL" },AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
