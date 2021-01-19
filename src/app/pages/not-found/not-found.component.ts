import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../service/language.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private translate: TranslateService, private language: LanguageService) {
  }

  ngOnInit(): void {
    this.translate.use(this.language.getLanguage());
  }

}
