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
import { ExchangeComponent } from './exchange/exchange.component';
import { UserHistoryAcceptedComponent } from './profile/user-history/user-history-accepted/user-history-accepted.component';
import { UserHistoryPendingComponent } from './profile/user-history/user-history-pending/user-history-pending.component';
import { UserHistoryRejectedComponent } from './profile/user-history/user-history-rejected/user-history-rejected.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { RatingComponent } from './rating/rating.component';
import { CatalogComponent } from './catalog/catalog.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';


const SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 4,
  autoplay: 0,
  grabCursor: true,
  slidesPerGroup: 1,
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
  pagination: '.swiper-pagination',
  paginationClickable: true,
};

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
    UserHistoryPendingComponent,
    UserHistoryRejectedComponent,
    RatingComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule,
    FlashMessagesModule,
    MyDatePickerModule,
    CollapseModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    SwiperModule.forRoot(SWIPER_CONFIG)
  ],
  providers: [{ provide: LOCALE_ID, useValue: "pl-PL" }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
