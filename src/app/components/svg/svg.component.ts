import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {Point} from '../../models/point';
import {PointService} from '../../service/point/point.service';
import {Subscription} from 'rxjs';
import {LanguageService} from "../../service/language.service";

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css'],
})
export class SvgComponent implements OnInit, OnDestroy{
  rField: number;
  rValid: boolean;
  points: Point[] = [];
  subPoints: Subscription | undefined;
  constructor(private httpPoint: PointService, private language: LanguageService) {
    this.rField = 1;
    this.rValid = true;
  }

  ngOnInit(): void {
    this.subPoints = this.httpPoint.point.subscribe(point => {
      this.points.push(point);
      this.point_draw(point);
    });
  }

  show_coords($event: any): void {
    if (this.rValid) {
      const rect = $event.currentTarget.getBoundingClientRect();
      const x = $event.clientX - rect.left;
      const y = $event.clientY - rect.top;
      const radius = this.rField;
      const basis = 100 / radius;
      const cx = ((x - 150) / basis);
      const cy = ((150 - y) / basis);
      console.log(this.language.getLogMessage('LOG.SEND'));
      this.httpPoint.doPost({x: cx, y: cy, r: radius});
    }
  }

  point_draw(point: Point): void {
    console.log(this.language.getLogMessage('LOG.DRAW_POINT'));
    if (point.r === this.rField) {
      const x = point.x * 100 / point.r + 150;
      const y = 150 - point.y * 100 / point.r;
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('class', 'point');
      circle.setAttribute('cx', String(x));
      circle.setAttribute('cy', String(y));
      circle.setAttribute('r', '3');
      circle.setAttribute('stroke', '#311D3F');
      if (point.result) {
        circle.setAttribute('fill', '#1D3F33');
      }
      if (!point.result) {
        circle.setAttribute('fill', 'red');
      }
      (document.querySelector('#area') as HTMLElement).appendChild(circle);

    }
  }

  redraw(radius: any): void {
    this.rField = Number(radius.r);
    this.rValid = radius.valid;
    console.log(this.language.getLogMessage('LOG.REDRAW'));
    this.removePoints();
    this.points.forEach(point => this.point_draw(point));
  }

  removePoints(): void {
    document.querySelectorAll('.point').forEach((point) => {
      (point.parentNode as Node).removeChild(point);
    });
  }

  ngOnDestroy(): void {
    if (this.subPoints !== undefined) { this.subPoints?.unsubscribe(); }
  }
}
