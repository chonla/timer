import { Injectable } from '@angular/core';
import { AvailableSounds } from '../constants/sounds';
import { ISound } from '../interfaces/sound.interface';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private _cache: { [key: string]: HTMLAudioElement };
  private _recentSoundKey: string;

  constructor() {
    this._cache = {};
    this._recentSoundKey = '';
  }

  public load(audioKey: string): void {
    this._recentSoundKey = audioKey;
    if (Object.keys(this._cache).indexOf(audioKey) === -1) {
      const audio = AvailableSounds.find((audio: ISound) => audio.key === audioKey);
      if (audio) {
        this.cacheAudio(audioKey, audio.url);
      }
    }
  }

  public play(): void {
    if (this._recentSoundKey !== '' && Object.keys(this._cache).indexOf(this._recentSoundKey) !== -1) {
      this._cache[this._recentSoundKey].play();
    }
  }

  private cacheAudio(key: string, url: string): void {
    fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader;
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      }))
      .then(base64 => {
        this._cache[key] = new Audio(`${base64}`);
        this._cache[key].load();
      });
  }
}
