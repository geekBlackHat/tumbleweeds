import { Component, OnInit,TemplateRef ,ViewChild } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Routes, RouterModule,Router } from '@angular/router' ;
import { ApiCallsService } from '../../services/apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ApiCallsService],
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('form') form: any;
  //@ViewChild('frmSignIn') tform : any;
  @ViewChild('ConfirmTemplate') confirmModal : any;
  modalRef: BsModalRef;
  UserData : object = {};
  LoginData : object = {};
  bsModalRef: BsModalRef;
  loginLabel : string;
  loginBool : boolean = false;
  signErrorLabel : string;
  signErrorFlag : boolean = false;
  signInButtonText : string = "Sign In";

 // pattern: "[^ @]*@[^ @]*";
  firstName:string;lastName:string;email:string;mobile:number;
 
  constructor(private modalService: BsModalService, private _route: Router, private ApiCallsService: ApiCallsService) { 
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
    this.loginBool = false;
    this.signInButtonText = "Sign In";
    this.LoginData = {
      Email:'',Password:''
    }
    
   // this.tform.reset();
  }

  ngOnInit() {
     
  }

  userRegistration(data :  any, template: TemplateRef<any>){
    if(!this.form.dirty || data.fname == "" || data.lname == "" || data.email == "" || data.mobile == "" || data.password == ""){
      this.signErrorLabel = "Please enter all data";
      this.signErrorFlag = true;
     return;
  }
  
  this.signErrorFlag = false;
  console.log(data);
  console.log(this.UserData);
  this.ApiCallsService.postData(this.UserData, '/AddRegistrationInfo').subscribe(res => {
    console.log(res);
    if(res == "Successfuly Created"){
         this.modalRef = this.modalService.show(template);
         this.form.reset();
    }
    //this.confirmModal.show();
  });
}

  Login(loginData){
    console.log(loginData);
    if(loginData.Email == "" || loginData.Password == ""){
        this.loginLabel = "Enter Login Credentials";
        this.loginBool = true;
        return;
    }
   // this.modalRef.hide();
   this.signInButtonText = "Signing In...";
   this.loginBool = false;
   
     this.ApiCallsService.postData(loginData, '/GetRegistrationInfoById').subscribe(res => {
       console.log(res);
        this.signInButtonText = "Sign In"
        if (res.Registrations != undefined){
          localStorage.setItem('userID', res.Registrations[0].id);
          this.modalRef.hide();
          this._route.navigateByUrl("/dashboard");
        }
        else {
          //invalid login credentials
        }
    });
    
  }

  confirm(){
    this.modalRef.hide();
  }

  forgetPassword(){
      alert("hi");
  }

}

//req : userID
/*
{
  "userInfo" : {
    "FirstName" : ""
  },
  "BTCTransactionHistory" : [{},{}]
}
*/