import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router,RouterModule ,Routes} from '@angular/router';
import { ApiCallsService } from './../../services/apiservice.service'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  modalRef: BsModalRef;
  buyAmount : any;
  buy : boolean;sell: boolean;
  coin: string = "BTC";
  buyPricePerBTC : any;
  buyTotalValue : any;
  sellAmount : any;
  sellPricePerBTC : any;
  sellTotalValue :any;
  TradeTitle : string;
  amount : any;
  perBtc : any;
  sellBindAmount : any;
  sellBindperBtc : any;
  buyErrorLabel : string;
  sellErrorLabel : string;

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
  userId : any;

  constructor(private _router: Router, private httpCalls: ApiCallsService, private modalService: BsModalService, private ApiCallsService: ApiCallsService) {

  }

  ngOnInit() {
    this.httpCalls.getAllItems('http://xrp-backend-tumbleweed-backend.7e14.starter-us-west-2.openshiftapps.com/pingAPI').subscribe(
      res => {
        console.log(res);
      }
    );
    this.userId = localStorage.getItem('userID');
  }

  profile(){
      this._router.navigateByUrl("profile");
  }

  openModal(template: TemplateRef<any>, trade:any) {
    if(trade == "buy" && this.buyAmount != undefined && this.buyPricePerBTC != undefined){       
       this.TradeTitle = "NEW BUY ORDER";
       this.modalRef = this.modalService.show(template);
       this.amount;this.perBtc;this.buyTotalValue;
       this.buy = true; this.sell = false;
    }
    else if(trade == "sell" && this.sellAmount != undefined && this.sellPricePerBTC != undefined){
      this.TradeTitle = "NEW SELL ORDER";
      this.modalRef = this.modalService.show(template);
      this.sellBindAmount;this.sellBindperBtc;this.sellTotalValue; this.sell = true;this.buy = false;
    }
  }

  onKey(event,trade){
    if(trade == "buy"){
     if(this.buyAmount != undefined && this.buyPricePerBTC){
          this.amount = this.buyAmount;
          this.perBtc = this.buyPricePerBTC;
          this.buyTotalValue = this.amount * this.perBtc;
      }
      else{
        this.buyTotalValue = 0;
      }
     }
     else{
      if(this.sellAmount != undefined && this.sellPricePerBTC){
          this.sellBindAmount = this.sellAmount;
          this.sellBindperBtc = this.sellPricePerBTC;
          this.sellTotalValue = this.sellBindAmount * this.sellBindperBtc;
      }
      else{
        this.sellTotalValue = 0;
      }
     }
  }

  buyBTC(){
    var buyBTCObj = {
      userID: this.userId,
      amount: this.buyAmount,
      price: this.buyPricePerBTC
    }

    this.ApiCallsService.postData(buyBTCObj, '/buyBTC').subscribe(res => {
      console.log(res);
    });
  }

  sellBTC(){
    var sellBTCObj = {
      userID: this.userId,
      amount: this.sellBindAmount,
      price: this.sellBindperBtc
    }

    this.ApiCallsService.postData(sellBTCObj, '/sellBTC').subscribe(res => {
      console.log(res);
    });
  }

}
