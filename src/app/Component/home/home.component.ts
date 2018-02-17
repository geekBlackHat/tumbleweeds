import { Component, OnInit,TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Routes, RouterModule,Router } from '@angular/router' ;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  UserData : object = {};
  LoginData : object = {};
  bsModalRef: BsModalRef;
  firstName:string;lastName:string;email:string;mobile:number;
 
  constructor(private modalService: BsModalService, private _route : Router) { 
    this.UserData = {
      FirstName:'',
      LastName:'',Email:'',MobileNumber:'',Password:''
    }

    this.LoginData = {
      Email:'',Password:''
    }

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
  }

  UserRegistration(Data){
     //alert(Data);
     console.log(Data.FirstName);
  }

  Login(loginData){
    console.log(loginData);
    this.modalRef.hide();
    this._route.navigateByUrl("/dashboard");
  }

  forgetPassword(){
      alert("hi");
  }

}
