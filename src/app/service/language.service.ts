import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translate: TranslateService) {
  }
  getLanguage(): string {
    const language = localStorage.getItem('language');
    if (language != null) {
      return language;
    }
    return 'en';
  }

  getLogMessage(key: string): string{
    return this.translate.instant(key);
  }

}
