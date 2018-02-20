import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Routes, RouterModule,Router } from '@angular/router' ;
import { HttpCallsService } from '../../Services/apiservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [HttpCallsService],
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

  constructor(private elementRef: ElementRef, private modalService: BsModalService, private _route: Router, private httpCallsService: HttpCallsService) { }

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
    this.httpCallsService.postData(this.txnSendObject,'/sendBTC').subscribe(res => {

    });
  }
   
  

}
