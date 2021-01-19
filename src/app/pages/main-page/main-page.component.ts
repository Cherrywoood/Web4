import {Component, OnInit, ViewChild} from '@angular/core';
import {PointService} from '../../service/point/point.service';
import {UserService} from '../../service/user/user.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from "../../service/language.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  @ViewChild('svg') svg: any;
  constructor(private httpPoint: PointService, private user: UserService,
              private router: Router, private translate: TranslateService,
              private language: LanguageService) {
  }

  ngOnInit(): void {
    this.httpPoint.doGet();
    this.translate.use(this.language.getLanguage());
  }

  changeRadius(radius: any): void {
    this.svg.redraw(radius);
  }

  logOut(): void {
    this.user.logOut();
    this.router.navigate(['/login']);
  }
}
