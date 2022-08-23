import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../backend.service';

@Component({
  selector: 'app-create-code',
  templateUrl: './create-code.component.html',
  styleUrls: ['./create-code.component.css'],
})
export class CreateCodeComponent implements OnInit {
  password = '';
  description = '';
  points = 0;

  jwt = '';
  dlLink: any;

  constructor(private backend: BackendService) {}

  ngOnInit() {}

  async generate() {
    if (
      this.password.length > 0 &&
      this.description.length > 0 &&
      this.points > 0
    ) {
      const id = await this.backend.storeQRCodeDescription(
        this.description,
        this.points
      );
      const jwt = await this.backend.generateQRCode(id, this.password);
      this.jwt = jwt;
    }
  }

  onChangeURL(url: any) {
    this.dlLink = url;
  }
}
