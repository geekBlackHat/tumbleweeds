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

  constructor(private elementRef: ElementRef, private modalService: BsModalService, private _route: Router, private ApiCallsService: ApiCallsService) { }

  ngOnInit() { 
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#273548';
    this.elementRef.nativeElement.ownerDocument.body.style.color = '#fff';
    this.txnSendObject.userId = localStorage.getItem('userID');
  }

  openWithdrawalModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openDepositModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  sendBTC(){
    this.ApiCallsService.postData(this.txnSendObject,'/sendBTC').subscribe(res => {
      console.log(res);
    });
  }
   
  

}
