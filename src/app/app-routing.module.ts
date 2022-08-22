import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PctLoginComponent } from './login/pct-login/pct-login.component';
import { LoginGuard } from './login-guard.guard';
import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { ScannerComponent } from './menu/scan/scanner/scanner.component';
import { ScoresDisplayComponent } from './menu/scores/scores-display/scores-display.component';
import { CreateCodeComponent } from './menu/create/create-code/create-code.component';

const routes: Routes = [
  {
    path: 'login',
    component: PctLoginComponent,
  },

  {
    path: 'menu',
    children: [
      {
        path: '',
        component: MainMenuComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'scan',
        component: ScannerComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'scores',
        component: ScoresDisplayComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'create',
        component: CreateCodeComponent,
        canActivate: [LoginGuard],
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
