import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pct-login',
  templateUrl: './pct-login.component.html',
  styleUrls: ['./pct-login.component.css'],
})
export class PctLoginComponent implements OnInit {
  userName = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const cu = localStorage['current-user'];
    if (cu != null && cu.length > 0) {
      this.router.navigate(['/']);
    }
  }

  loginHandler() {
    if (this.userName.length > 0) {
      localStorage['current-user'] = this.userName;
      this.router.navigate(['/']);
    } else {
      alert('Bitte Namen eingeben!');
    }
  }
}
