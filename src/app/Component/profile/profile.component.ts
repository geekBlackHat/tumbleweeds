import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Routes, RouterModule,Router } from '@angular/router' ;
import { ApiCallsService } from '../../services/apiservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [ApiCallsService],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  modalRef: BsModalRef;

  depositINRError :boolean =false;
  withdrawINRError : boolean =false;
  showLoader :boolean =false;
  showResult : boolean =false;
  withdrawBTCResult : any;
  showMainWithdraw : boolean =true;
  withdrawBTCStatus : number =0;

  profile = {
    "FirstName": "Anurag",
    "LastName": "Sharma",
    "Email": "anurag@gmail.com",
    "Password": "12345",
    "MobileNumber": "1234567890",
  };

  txnSendObject = {
    userId:"",
    destinationAddress:"",
    amountSatoshis:"",
    remarks:"",
  }

  txnDepositINR = {
    userId:"",   
    amount:"" ,
    remarks:"",
    type:"deposit" 
  }

  txnWithdrawINR = {
    userId:"",   
    amount:"" ,
    remarks:"",
    type :"withdraw" 
  }

  constructor(private elementRef: ElementRef, private modalService: BsModalService, private _route: Router, private ApiCallsService: ApiCallsService) { }

  ngOnInit() { 
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#273548';
    this.elementRef.nativeElement.ownerDocument.body.style.color = '#fff';
    this.txnSendObject.userId = localStorage.getItem('userID');
    this.txnDepositINR.userId = localStorage.getItem('userID');
    this.txnWithdrawINR.userId = localStorage.getItem('userID');
  }

  openWithdrawalModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);  
  }

  openDepositModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  sendBTC(){
    this.withdrawBTCStatus =1;
    this.showLoader =true;
    this.showResult =false;
    this.showMainWithdraw = false;
    this.ApiCallsService.postData(this.txnSendObject,'/sendBTC').subscribe(res => {
      console.log(res); 
      this.withdrawBTCStatus =2;     
      this.showResult =true;
      this.showLoader =false;
      this.withdrawBTCResult =res;
    });
  }
   
  transactionINR(data)
  {   
   /* if(this.txnSendObject.amountSatoshis !=null && this.txnSendObject.amountSatoshis !="")
    {
     this.withdrawINRError = false;
    }
    else
    {
      this.withdrawINRError = true;
    }*/
    
  }
  
  
}
