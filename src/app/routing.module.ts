import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { AppComponent }           from './app.component';
import { UserGameComponent }      from './user-game/user-game.component';
import { CoreComponent }		  from './core/core.component';

export const router: Routes = [
	{ path: 'user-game', component: UserGameComponent},
	{ path: '', redirectTo: '/main', pathMatch:'full'},
	{ path: 'main', component: CoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class RoutingModule {}