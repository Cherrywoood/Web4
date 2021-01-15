import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Point} from '../../models/point';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  point;
  header;

  constructor(private http: HttpClient) {
    this.point = new Subject<Point>();
    this.header = new HttpHeaders().set('Content-Type', 'application/json');
  }

  doPost(point: object): void {
    console.log(point);
    this.http.post('http://localhost:8080/point', point, {headers: this.header}).subscribe(
      (data: any) => this.point.next(data),
      error => console.log(error));
  }

  doGet(): void {
    this.http.get('http://localhost:8080/point', {headers: this.header}).subscribe(
      (data: any) => data.forEach((point: any) => this.point.next(point)),
      error => console.log(error));
  }
}
