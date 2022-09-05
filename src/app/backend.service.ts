import { Injectable } from '@angular/core';
import * as jose from 'jose';

export interface HighScoreEntry {
  name: string;
  points: number;
}

export interface ScanEvent {
  groupName: string;
  qrId: number;
  points: number;
}

export interface QRCode {
  id: number;
  description: string;
  points: number;
}

export interface ScanResult {
  qrCodeFound: QRCode | null;
  scannedFirst: boolean;
}

@Injectable({ providedIn: 'root' })
export class BackendService {
  // used during development, in production the app will need a real backend
  localScanEvents: ScanEvent[] = [];
  localCodes: QRCode[] = [];

  constructor() {
    if ('local-codes' in localStorage) {
      this.localCodes = JSON.parse(localStorage['local-codes']);
    }
    if ('local-scan-events' in localStorage) {
      this.localScanEvents = JSON.parse(localStorage['local-scan-events']);
    }
  }

  storeLocalData() {
    localStorage['local-codes'] = JSON.stringify(this.localCodes);
    localStorage['local-scan-events'] = JSON.stringify(this.localScanEvents);
  }

  isDevEnvironment() {
    return (
      window.location.href.indexOf('localhost') !== -1 ||
      window.location.href.indexOf('127.0.0.1') !== -1 ||
      window.location.href.indexOf('stackblitz') !== -1
    );
  }

  async getHighscores(): Promise<HighScoreEntry[]> {
    if (!this.isDevEnvironment()) {
      throw new Error('Implement a real backend for production!');
    } else {
      const byName: Record<string, number> = {};
      for (const event of this.localScanEvents) {
        byName[event.groupName] = (byName[event.groupName] || 0) + event.points;
      }

      const highscores: HighScoreEntry[] = Object.keys(byName).map((name) => ({
        name,
        points: byName[name],
      }));

      highscores.sort((a, b) => b.points - a.points);

      return highscores;
    }
  }

  async addPoints(jwtScanned: string, groupName: string): Promise<ScanResult> {
    if (!this.isDevEnvironment()) {
      throw new Error('Implement a real backend for production!');
    } else {
      // in dev mode no verification is done
      // in production the verification will happen in the server
      // for size reasons the jwt does not contain anything but the id

      const result: ScanResult = {
        qrCodeFound: null,
        scannedFirst: false,
      };

      try {
        const claims = jose.decodeJwt(jwtScanned);
        const id = Number(claims.jti);

        console.log('scanned ' + id);

        const localCode = this.localCodes.find((lc) => lc.id === id);

        console.log(this.localCodes);

        if (localCode != null) {
          result.qrCodeFound = localCode;

          const scannedBefore = this.localScanEvents.find(
            (le) => le.qrId === id
          );
          if (scannedBefore == null) {
            this.localScanEvents.push({
              groupName,
              points: localCode.points,
              qrId: localCode.id,
            });

            this.storeLocalData();

            result.scannedFirst = true;
          }
        }
      } catch (e) {
        console.log('Bad QR Code', e);
      }

      return result;
    }
  }

  async createQRCode(description: string, points: number, key: string) {
    if (!this.isDevEnvironment()) {
      throw new Error('Implement a real backend for production!');
    } else {
      this.localCodes.push({
        id: this.localCodes.length + 1,
        description,
        points,
      });
      const id = this.localCodes.length;
      const jwt = await new jose.SignJWT({
        jti: id + '',
      })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(new TextEncoder().encode(key));

      this.storeLocalData();

      return jwt;
    }
  }
}
