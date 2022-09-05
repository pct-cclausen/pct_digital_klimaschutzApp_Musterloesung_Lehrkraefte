import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../backend.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css'],
})
export class ScannerComponent implements OnInit {
  constructor(private backend: BackendService) {}

  ngOnInit() {}

  async onData(data: any) {
    console.log(data);

    const result = await this.backend.addPoints(
      data,
      localStorage['current-user']
    );

    if (result.qrCodeFound == null) {
      // Do nothing, this happens a lot
    } else if (result.scannedFirst) {
      alert(
        result.qrCodeFound.description +
          '\nDu hast ' +
          result.qrCodeFound.points +
          ' Punkte erhalten!'
      );
    } else {
      alert('Leider gibt es für mehrfache Scans keine Punkte');
    }
  }

  onError(e: any) {
    alert('Es gab einen Fehler: ' + JSON.stringify(e));
  }
}
