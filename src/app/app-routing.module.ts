import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HelloComponent } from './hello.component';
import { PctLoginComponent } from './login/pct-login/pct-login.component';
import { LoginGuard } from './login-guard.guard';
import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { ScannerComponent } from './menu/scan/scanner/scanner.component';

const routes: Routes = [
  {
    path: 'login',
    component: PctLoginComponent,
  },

  {
    path: 'menu',
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: MainMenuComponent,
      },
      {
        path: 'scan',
        component: ScannerComponent,
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
