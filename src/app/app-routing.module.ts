import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HelloComponent } from './hello.component';
import { PctLoginComponent } from './login/pct-login/pct-login.component';

const routes: Routes = [
  {
    path: 'login',
    component: PctLoginComponent,
  },

  {
    path: '',
    component: HelloComponent,
    canActivate: [],
  },

  {
    path: '**',
    redirectTo: '',
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
