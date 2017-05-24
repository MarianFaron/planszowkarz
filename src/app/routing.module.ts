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
					{ path: 'history', component: UserHistoryComponent },
					{ path: 'config', component: UserConfigComponent }
      	]
	},
	{ path: 'user-profile/:login', component: OtherUserComponent },
	{ path: 'game/:_id', component: GameDetailsComponent },
	{ path: 'search-results', component: GamesListComponent },
	{ path: 'games', component: GamesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class RoutingModule {}
