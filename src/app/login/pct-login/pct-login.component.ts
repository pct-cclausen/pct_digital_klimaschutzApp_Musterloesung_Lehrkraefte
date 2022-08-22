import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pct-login',
  templateUrl: './pct-login.component.html',
  styleUrls: ['./pct-login.component.css'],
})
export class PctLoginComponent implements OnInit {
  userName = '';

  constructor() {}

  ngOnInit() {}

  loginHandler() {
    if (this.userName.length > 0) {
    } else {
      alert('Bitte Namen eingeben!');
    }
  }
}
