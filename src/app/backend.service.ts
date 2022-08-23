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

export interface LocalQRCodes {
  id: number;
  description: string;
  points: number;
}

@Injectable({ providedIn: 'root' })
export class BackendService {
  // used during development, in production the app will need a real backend
  localScanEvents: ScanEvent[] = [];
  localCodes: LocalQRCodes[] = [];

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
        byName[event.groupName] = (byName[event.groupName] || 0) + 1;
      }

      const highscores: HighScoreEntry[] = Object.keys(byName).map((name) => ({
        name,
        points: byName[name],
      }));

      highscores.sort((a, b) => b.points - a.points);

      return highscores;
    }
  }

  async addPoints(jwtScanned: string, groupName: string): Promise<number> {
    if (!this.isDevEnvironment()) {
      throw new Error('Implement a real backend for production!');
    } else {
      // in dev mode no verification is done
      // in production the verification will happen in the server
      // for size reasons the jwt does not contain anything but the id
      const claims = jose.decodeJwt(jwtScanned);
      const id = Number(claims.jti);
      const localCode = this.localCodes.find((lc) => lc.id === id);
      if (localCode != null) {
        this.localScanEvents.push({
          groupName,
          points: localCode.points,
          qrId: localCode.id,
        });
        return localCode.points;
      }
    }
    return 0;
  }

  async storeQRCodeDescription(description: string, points: number) {
    if (!this.isDevEnvironment()) {
      throw new Error('Implement a real backend for production!');
    } else {
      this.localCodes.push({
        id: this.localCodes.length + 1,
        description,
        points,
      });
      return this.localCodes.length;
    }
  }

  async generateQRCode(id: number, key: string) {
    const jwt = await new jose.SignJWT({
      jti: id + '',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .sign(new TextEncoder().encode(key));

    return jwt;
  }
}
