import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { CoreComponent }          from './core/core.component';
import { AppComponent }           from './app.component';
import { UsersComponent }         from './users/users.component';
import { UserProfileComponent }   from './user-profile/user-profile.component';
import { OtherUserComponent }     from './other-user/other-user.component';
import { GameDetailsComponent }   from './game-details/game-details.component'


import { AuthGuard } from './guards/auth.guard';

export const router: Routes = [
	{ path: '', redirectTo: '/main', pathMatch:'full'},
	{ path: 'main', component: CoreComponent },
	{ path: 'register', component: UsersComponent},
	{ path: 'user-games', component: UserProfileComponent, canActivate: [AuthGuard]},
	{ path: 'user/:_id', component: OtherUserComponent },
	{ path: 'game/:_id', component: GameDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class RoutingModule {}
