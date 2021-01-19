import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  getLanguage(): string {
    const language = localStorage.getItem('language');
    if (language != null) {
      return language;
    }
    return 'en';
  }
}
