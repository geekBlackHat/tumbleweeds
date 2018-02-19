import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  profile(){
      this._router.navigateByUrl("profile");
  }

}
