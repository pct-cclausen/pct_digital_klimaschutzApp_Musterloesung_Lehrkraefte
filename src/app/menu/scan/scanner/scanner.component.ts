import { Component, OnInit } from '@angular/core';

// This needs to be a scanner based on
// https://stackblitz.com/edit/angular-ngx-scanner-qrcode?file=src%2Fapp%2Fapp.component.html

// first step is to integrate the libary into the dependencies and get it to work to just console log the contents of the scanned qr code

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css'],
})
export class ScannerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
