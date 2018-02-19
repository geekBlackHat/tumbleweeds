import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Routes, RouterModule,Router } from '@angular/router' ;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
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
  constructor(private elementRef: ElementRef,private modalService: BsModalService, private _route : Router) { }

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#273548';
    this.elementRef.nativeElement.ownerDocument.body.style.color = '#fff';
  }

  openWithdrawalModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openDepositModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
   
  

}
