import { Injectable } from '@angular/core';
import { AvailableSounds } from '../constants/sounds';
import { ISound } from '../interfaces/sound.interface';
import axios from 'axios';

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

  public load(audioKey: string): Promise<any> {
    this._recentSoundKey = audioKey;
    if (Object.keys(this._cache).indexOf(audioKey) === -1) {
      const audio = AvailableSounds.find((audio: ISound) => audio.key === audioKey);
      if (audio) {
        return this.cacheAudio(audioKey, audio.url);
      }
      return Promise.reject()
    }
    return Promise.resolve()
  }

  public play(): void {
    if (this._recentSoundKey !== '' && Object.keys(this._cache).indexOf(this._recentSoundKey) !== -1) {
      this._cache[this._recentSoundKey].play();
    }
  }

  private cacheAudio(key: string, url: string): Promise<any> {
    return axios
      .get(url, {
        responseType: 'blob'
      })
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob.data);
      }))
      .then(base64 => {
        this._cache[key] = new Audio(`${base64}`);
        this._cache[key].load();
      });
  }
}
