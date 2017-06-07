import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { CoreComponent }          from './core/core.component';
import { AppComponent }           from './app.component';
import { UsersComponent }         from './users/users.component';
import { ProfileComponent }       from './profile/profile.component';
import { OtherUserComponent }     from './other-user/other-user.component';
import { GameDetailsComponent }   from './game-details/game-details.component';
import { GamesListComponent }     from './games-list/games-list.component';
import { UserGamesComponent }     from './profile/user-games/user-games.component';
import { UserNotificationsComponent } from './profile/user-notifications/user-notifications.component';
import { UserConfigComponent } from './profile/user-config/user-config.component';
import { UserHistoryComponent } from './profile/user-history/user-history.component';
import { UserHistoryAcceptedComponent } from './profile/user-history/user-history-accepted/user-history-accepted.component';
import { UserHistoryPendingComponent } from './profile/user-history/user-history-pending/user-history-pending.component';
import { UserHistoryRejectedComponent } from './profile/user-history/user-history-rejected/user-history-rejected.component';
import { RatingComponent } from './rating/rating.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AuthGuard } from './guards/auth.guard';

export const router: Routes = [
	{ path: '', redirectTo: '/main', pathMatch:'full'},
	{ path: 'main', component: CoreComponent },
	{ path: 'register', component: UsersComponent},
	{ path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],
		children: [
      		{ path: '', redirectTo: 'games', pathMatch: 'full' },
      		{ path: 'games', component: UserGamesComponent },
      		{ path: 'notifications', component: UserNotificationsComponent },
			{ path: 'history', component: UserHistoryComponent,
				children: [
					{path: '', redirectTo: 'accepted', pathMatch: 'full'},
					{path: 'accepted', component: UserHistoryAcceptedComponent},
					{path: 'pending', component: UserHistoryPendingComponent},
					{path: 'rejected', component: UserHistoryRejectedComponent}
				]
			},
			{ path: 'config', component: UserConfigComponent }
      	]
	},
	{ path: 'user-profile/:login', component: OtherUserComponent },
	{ path: 'games/:_id', component: GameDetailsComponent },
	{ path: 'search-results', component: GamesListComponent },
	{ path: 'games', component: GamesListComponent },
  { path: 'rating', component: RatingComponent },
  { path: 'catalog', component: CatalogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class RoutingModule {}
