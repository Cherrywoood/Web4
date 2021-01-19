import {Component, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'web4';
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ru', 'es']);
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }
}
