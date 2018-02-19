import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpCallsService } from './../../services/httpservice.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tickerAPIResults : any = {
    buy_orders : [
      { vol: 0.324, price: 700000 },
      { vol: 0.324, price: 700000 },
      { vol: 0.324, price: 700000 },
      { vol: 0.324, price: 700000 },
      { vol: 0.324, price: 700000 },
      { vol: 0.324, price: 700000 },
      { vol: 0.324, price: 700000 },
      { vol: 0.324, price: 700000 },
      { vol: 0.324, price: 700000 },
      { vol: 0.324, price: 700000 },
      { vol: 0.324, price: 700000 }
    ]
  };

  constructor(private _router: Router, private httpCalls: HttpCallsService) { }

  ngOnInit() {
    this.httpCalls.getAllItems('http://xrp-backend-tumbleweed-backend.7e14.starter-us-west-2.openshiftapps.com/pingAPI').subscribe(
      res => {
        console.log(res);
      }
    );
  }

  profile(){
      this._router.navigateByUrl("profile");
  }

}
