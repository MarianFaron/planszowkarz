import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core'
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { CoreComponent } from './core/core.component';
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
import { ExchangeComponent } from './exchange/exchange.component';
import { UserHistoryAcceptedComponent } from './profile/user-history/user-history-accepted/user-history-accepted.component';
import { UserHistorySentComponent } from './profile/user-history/user-history-sent/user-history-sent.component';
import { UserHistoryRejectedComponent } from './profile/user-history/user-history-rejected/user-history-rejected.component';
import { UserHistoryReceivedComponent } from './profile/user-history/user-history-received/user-history-received.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RatingComponent } from './rating/rating.component';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Component } from '@angular/core';
import { Ng2DragDropModule } from "ng2-drag-drop";
import { SlickModule } from 'ngx-slick';
import { ContactComponent } from './contact/contact.component';
import { AboutProjectComponent } from './about-project/about-project.component';
import { ChatComponent } from './chat/chat.component';
import { AuthorsComponent } from './authors/authors.component';
import { StarRatingModule } from 'angular-star-rating';


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
    UserHistoryFilterPipe,
    ExchangeComponent,
    UserHistoryAcceptedComponent,
    UserHistorySentComponent,
    UserHistoryRejectedComponent,
    RatingComponent,
    UserHistoryReceivedComponent,
    ContactComponent,
    AboutProjectComponent,
    ChatComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    MyDatePickerModule,
    CollapseModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    Ng2DragDropModule.forRoot(),
    SlickModule.forRoot(),
    StarRatingModule.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pl-PL" }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
