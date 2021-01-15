import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import {Point} from '../../models/point';
import {PointService} from '../../service/point/point.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy{
  points: Point[] = [];
  subPoints: Subscription | undefined;
  constructor(private httpPoint: PointService) {
  }

  ngOnInit(): void {
    this.subPoints = this.httpPoint.point.subscribe(point => {
      this.points.push(point);
    });
  }

  ngOnDestroy(): void {
    if ( this.subPoints !== undefined) { this.subPoints?.unsubscribe(); }
  }

}
