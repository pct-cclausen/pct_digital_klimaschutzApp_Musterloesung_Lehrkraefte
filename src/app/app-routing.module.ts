import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HelloComponent } from './hello.component';
import { PctLoginComponent } from './login/pct-login/pct-login.component';
import { LoginGuard } from './login-guard.guard';
import { MainMenuComponent } from './menu/main-menu/main-menu.component';

const routes: Routes = [
  {
    path: 'login',
    component: PctLoginComponent,
  },

  {
    path: 'menu',
    component: MainMenuComponent,
    canActivate: [LoginGuard],
  },

  {
    path: '**',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
