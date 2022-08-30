import { Component, OnInit } from '@angular/core';
import { BackendService, HighScoreEntry } from '../../../backend.service';
import { crown } from '../../../images';

@Component({
  selector: 'app-scores-display',
  templateUrl: './scores-display.component.html',
  styleUrls: ['./scores-display.component.css'],


})
export class ScoresDisplayComponent implements OnInit {
  public scores: HighScoreEntry[] = [];
  constructor(private backend: BackendService) {}
  crown=crown

  async ngOnInit() {
    this.scores = await this.backend.getHighscores();
    console.log("string")
  }
}
