import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { Router,RouterModule ,Routes} from '@angular/router';
import { ApiCallsService } from './../../services/apiservice.service'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subscription } from 'rxjs/Subscription';

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
  buyTotalValue : any = 0;
  sellAmount : any;
  sellPricePerBTC : any;
  sellTotalValue :any = 0;
  TradeTitle : string;
  amount : any;
  perBtc : any;
  sellBindAmount : any;
  sellBindperBtc : any;
  buyErrorLabel : string;
  sellErrorLabel : string;

  tickerAPIResults : any = {
    buyOrders : [
    ],
    sellOrders : [      
    ],
    tradingHistory : [      
    ]
  };
  userId : any;
  stockQuote: any;
  sub: Subscription;

  constructor(private _router: Router, private httpCalls: ApiCallsService, private elementRef: ElementRef, private modalService: BsModalService, private ApiCallsService: ApiCallsService) {
    
  }

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#273548';
    this.httpCalls.getAllItems('http://xrp-backend-tumbleweed-backend.7e14.starter-us-west-2.openshiftapps.com/pingAPI').subscribe(
      res => {
        console.log(res);
      }
    );
    this.sub = this.httpCalls.getQuotes()
      .subscribe(quote => {
        this.tickerAPIResults = quote;
        console.log("socket res", quote);
      });
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
          this.buyTotalValue = (this.amount * this.perBtc).toFixed(2);;
      }
      else{
        this.buyTotalValue = 0;
      }
     }
     else{
      if(this.sellAmount != undefined && this.sellPricePerBTC){
          this.sellBindAmount = this.sellAmount;
          this.sellBindperBtc = this.sellPricePerBTC;
          this.sellTotalValue = (this.sellBindAmount * this.sellBindperBtc).toFixed(2);
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
