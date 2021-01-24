import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Point} from '../../models/point';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../language.service';

@Injectable({
  providedIn: 'root'
})
export class PointService {
  point = new Subject<Point>();
  error = new Subject<HttpErrorResponse>();
  private header = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private http: HttpClient, private language: LanguageService) {}

  doPost(point: object): void {
    console.log(point);
    this.header = this.header.set('Accept-Language', this.language.getLanguage());
    this.http.post('http://localhost:11600/point', point, {headers: this.header}).subscribe(
      (data: any) => this.point.next(data),
      error => {
        console.log(error);
        this.error.next(error);
      });
  }

  doGet(): void {
    this.header = this.header.set('Language', this.language.getLanguage());
    this.http.get('http://localhost:11600/point', {headers: this.header}).subscribe(
      (data: any) => data.forEach((point: any) => this.point.next(point)),
      error => console.log(error));
  }
}
