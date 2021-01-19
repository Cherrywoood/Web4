import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {Point} from '../../models/point';
import {PointService} from '../../service/point/point.service';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from "../../service/language.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy{
  points: Point[] = [];
  locale: string;
  pointsSub: Subscription | undefined;
  localeSub: Subscription | undefined;
  constructor(private httpPoint: PointService, private translate: TranslateService,
              private language: LanguageService) {
    this.locale = this.language.getLanguage();
  }

  ngOnInit(): void {
    this.pointsSub = this.httpPoint.point.subscribe(point => {
      console.log('point');
      this.points.push(point);
    });
  }
  resultTable(result: boolean): string {
    if (result) {
      return this.translate.instant('MAIN.TABLE.RESULT_TRUE');
    } else {
      return this.translate.instant('MAIN.TABLE.RESULT_FALSE');
    }
  }

  ngOnDestroy(): void {
    if ( this.pointsSub !== undefined) { this.pointsSub?.unsubscribe(); }
    if (this.localeSub !== undefined) {
      this.localeSub?.unsubscribe();
    }
  }

}
