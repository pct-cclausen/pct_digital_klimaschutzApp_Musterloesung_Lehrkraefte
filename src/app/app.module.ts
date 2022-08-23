import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PctLoginComponent } from './login/pct-login/pct-login.component';
import { MainMenuComponent } from './menu/main-menu/main-menu.component';
import { ScannerComponent } from './menu/scan/scanner/scanner.component';
import { ScoresDisplayComponent } from './menu/scores/scores-display/scores-display.component';
import { CreateCodeComponent } from './menu/create/create-code/create-code.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, FormsModule, QRCodeModule],
  declarations: [
    MainMenuComponent,
    PctLoginComponent,
    AppComponent,
    ScannerComponent,
    ScoresDisplayComponent,
    CreateCodeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
