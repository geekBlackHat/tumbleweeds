import { Component, OnInit,TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Routes, RouterModule,Router } from '@angular/router' ;
import { HttpCallsService } from '../../Services/apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [HttpCallsService],
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  UserData : object = {};
  LoginData : object = {};
  bsModalRef: BsModalRef;
  firstName:string;lastName:string;email:string;mobile:number;
 
  constructor(private modalService: BsModalService, private _route: Router, private httpCallsService: HttpCallsService) { 
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
     this.httpCallsService.postData(Data, '/AddRegistrationInfo').subscribe(res => {
       console.log(res);
     });
  }

  Login(loginData){
    console.log(loginData);
    this.modalRef.hide();
    this.httpCallsService.postData(loginData, '/GetRegistrationInfoById').subscribe(res => {
      console.log(res);
      if (res.Registrations != undefined){
        localStorage.setItem('userID', res.Registrations[0].id);
        this._route.navigateByUrl("/dashboard");
      }
      else {
        //invalid login credentials
      }
    });
    
  }

  forgetPassword(){
      alert("hi");
  }

}
