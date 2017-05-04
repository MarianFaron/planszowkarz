import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { AppComponent }           from './app.component';
import { UserProfileComponent }      from './user-profile/user-profile.component';
import { UsersComponent }      from './users/users.component';
import { CoreComponent }		  from './core/core.component';

import { AuthGuard } from './guards/auth.guard';

export const router: Routes = [
	{ path: 'user-game', component: UserProfileComponent, canActivate: [AuthGuard]},
	{ path: '', redirectTo: '/main', pathMatch:'full'},
	{ path: 'main', component: CoreComponent },
	{	path: 'register', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class RoutingModule {}
