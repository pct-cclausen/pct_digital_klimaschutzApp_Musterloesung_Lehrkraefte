import { Injectable } from '@angular/core';

export interface HighScoreEntry {
  name: string;
  points: number;
}

export interface ScanEvent {
  groupName: string;
  qrId: number;
  points: number;
}

export interface LocalQRCodes {
  id: number;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class BackendService {
  // used during development
  localScanEvents: ScanEvent[] = [];
  localCodes: LocalQRCodes[] = [];

  isDevEnvironment() {
    return (
      window.location.href.indexOf('localhost') !== -1 ||
      window.location.href.indexOf('stackblitz') !== -1
    );
  }

  getHighscores(): HighScoreEntry[] {
    if (!this.isDevEnvironment()) {
      throw new Error('Implement a real backend for production!');
    } else {
      return [];
    }
  }

  addPoints(jwtScanned: string, groupName: string) {
    if (!this.isDevEnvironment()) {
      throw new Error('Implement a real backend for production!');
    } else {
    }
  }

  storeQRCodeDescription(description: string) {
    if (!this.isDevEnvironment()) {
      throw new Error('Implement a real backend for production!0');
    } else {
      this.localCodes.push({
        id: this.localCodes.length + 1,
        description,
      });
      return this.localCodes.length;
    }
  }
}
