import {Component, OnInit, ViewChild} from '@angular/core';
import {PointService} from '../../service/point/point.service';
import {UserService} from '../../service/user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  @ViewChild('svg') svg: any;
  constructor(private httpPoint: PointService, private user: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.httpPoint.doGet();
  }

  changeRadius(radius: any): void {
    this.svg.redraw(radius);
  }

  logOut(): void {
    this.user.logOut();
    this.router.navigate(['/login']);
  }
}
