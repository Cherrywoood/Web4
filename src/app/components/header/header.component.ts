import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from "../../service/language.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('selectList') select: any;

  constructor(private translate: TranslateService, private language: LanguageService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.selectLanguage();
  }

  useLanguage(index: number): void {
    const language = this.translate.getLangs()[index];
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  selectLanguage(): void {
    const index = this.translate.getLangs().
      indexOf(this.language.getLanguage());
    this.select.nativeElement.selectedIndex = index;
    this.useLanguage(index);
  }
}
