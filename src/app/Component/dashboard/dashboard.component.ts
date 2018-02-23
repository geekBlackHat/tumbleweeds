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
  tradingHistory : Array<any> = [];
  koinexData : any;

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
  tickerAPISorted : any = {
    "buyOrders" : [],
    "sellOrders" : []
  }

  userBuyOrders = [];
  userSellOrders = [];

  constructor(private _router: Router, private httpCalls: ApiCallsService, private elementRef: ElementRef, private modalService: BsModalService, private ApiCallsService: ApiCallsService) {
    
  }

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#273548';
    this.userId = localStorage.getItem('userID');
    this.httpCalls.getAllItems('http://xrp-backend-tumbleweed-backend.7e14.starter-us-west-2.openshiftapps.com/pingAPI').subscribe(
      res => {
        console.log(res);
      }
    );
    this.sub = this.httpCalls.getQuotes()
      .subscribe(quote => {
        this.tickerAPIResults = quote;
        console.log("socket res", quote);
        this.tickerAPISorted.buyOrders = this.shortTickerArray(this.tickerAPIResults.buyOrders);
        this.tickerAPISorted.sellOrders = this.shortTickerArray(this.tickerAPIResults.sellOrders);
        this.userBuyOrders = [];
        for (let i = 0; i < this.tickerAPIResults.buyOrders.length; i++){
          if (this.tickerAPIResults.buyOrders[i].userID == this.userId){
            this.userBuyOrders.push(this.tickerAPIResults.buyOrders[i]);
          }
        }
        this.userSellOrders = [];
        for (let i = 0; i < this.tickerAPIResults.sellOrders.length; i++) {
          if (this.tickerAPIResults.sellOrders[i].userID == this.userId) {
            this.userSellOrders.push(this.tickerAPIResults.sellOrders[i]);
          }
        }
        this.userBuyOrders = this.shortTickerArray(this.userBuyOrders);
        this.userSellOrders = this.shortTickerArray(this.userSellOrders);
    });
    
    this.getTradingHistory();
    this.tickerKoinex();
    this.emitSocketEvent();
  }

  emitSocketEvent(){
    this.ApiCallsService.getItem('/emitSocketEvent').subscribe(res => {
      console.log(res);
    });
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
     this.buyAmount='';
     this.buyPricePerBTC = ''; this.buyTotalValue = 0;
      this.modalRef.hide();
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
      this.sellAmount = '';
      this.sellPricePerBTC = '';this.sellTotalValue = 0;
      this.modalRef.hide();
      console.log(res);
    });
  }

  getTradingHistory(){
    var data = {
      "userid": this.userId
    }

    this.ApiCallsService.postData(data, '/getTradingHistory').subscribe(res => {
      console.log(res);
      this.tradingHistory = res.tradinghistory;
    });
  }

  tickerKoinex(){
    this.ApiCallsService.getAllItems('https://koinex.in/api/ticker').subscribe(res => {
      console.log(res);
      this.koinexData = res;
    });
  }

  cancelOrder(order, txType){
    console.log(order);
    order['txType'] = txType;
    this.ApiCallsService.postData(order, '/cancelOrder').subscribe(res => {
      console.log(res);
      //this.tradingHistory = res.tradinghistory;
    });
  }

  shortTickerArray (buyOrders) {
    for (var i = 0; i < buyOrders.length - 1; i++) {
      if ((buyOrders[i].price == buyOrders[i + 1].price)) {
        buyOrders[i].amount = parseFloat(buyOrders[i].amount) + parseFloat(buyOrders[i + 1].amount)
        buyOrders.splice(i + 1, 1);
        return this.shortTickerArray(buyOrders);
      }
    }
    return buyOrders;
  }
}
