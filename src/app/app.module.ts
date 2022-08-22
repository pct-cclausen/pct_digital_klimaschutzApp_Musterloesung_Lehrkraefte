import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AppRoutingModule } from './app-routing.module';
import { PctLoginComponent } from './login/pct-login/pct-login.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  declarations: [PctLoginComponent, AppComponent, HelloComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
