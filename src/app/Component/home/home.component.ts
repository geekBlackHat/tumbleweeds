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
  @ViewChild('ConfirmTemplate') confirmModal : TemplateRef<any>;
  modalRef: BsModalRef;
  UserData : object = {};
  LoginData : object = {};
  bsModalRef: BsModalRef;
  loginLabel : string;
  loginBool : boolean = false;
  signErrorLabel : string;
  signErrorFlag : boolean = false;
  signInButtonText : string = "Sign In";
  signUpPopUpTitle : string;
  signUpPopUpMsg : string;
  signUpButtonText: string = "Sign Up";

  isValidation : boolean = false;
  isValidateSignIn : boolean = false;

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
    this.isValidateSignIn = false;
    this.isValidation = false;
    this.LoginData = {
      Email:'',Password:''
    }
    
   // this.tform.reset();
  }

  ngOnInit() {
       this.isValidation = false;
       this.isValidateSignIn = false;
  }

  userRegistration(data :  any, template: TemplateRef<any>){
    if(!this.form.dirty || data.fname == "" || data.lname == "" || data.email == "" || data.mobile == "" || data.password == ""){
      this.isValidation = true;
      this.signErrorLabel = "Please enter all data";
      this.signErrorFlag = true;
     return;
  }
  this.isValidation = false;
  this.signErrorFlag = false;
  //console.log(data);
  console.log(this.UserData);
  this.signUpButtonText = "Signing Up..."
  try{
      this.ApiCallsService.postData(this.UserData, '/AddRegistrationInfo').subscribe((res) => {
        console.log(res);
        if(res.status == "Successfully Created"){
            this.signUpPopUpTitle = "User registration rompleted. Now, Log In!!";
            this.modalRef = this.modalService.show(template);
            this.form.reset();
            this.signUpButtonText = "Sign Up";
        }
      }, (logs) => {
           this.signUpPopUpMsg = "Somthing went wrong please try after sometime";
           this.signUpPopUpTitle = "Error";
           this.signUpButtonText = "Sign Up";
           this.form.reset();
           this.modalRef = this.modalService.show(template);
           console.log(logs);
      });
  }
  catch(ex){}
}

  Login(loginData){
    console.log(loginData);
    if(loginData.Email == "" || loginData.Password == ""){
        this.isValidateSignIn = true;
        this.loginLabel = "Enter Login Credentials";
        this.loginBool = true;
        return;
    }
   // this.modalRef.hide();
   this.isValidateSignIn = false;
   this.signInButtonText = "Signing In...";
   this.loginBool = false;
   
     this.ApiCallsService.postData(loginData, '/GetRegistrationInfoById').subscribe((res) => {
       console.log(res);
        this.signInButtonText = "Sign In"
        if (res.Registrations.length > 0){
          localStorage.setItem('userID', res.Registrations[0].id);
          this.modalRef.hide();
          this._route.navigateByUrl("/dashboard");
        }
        else {
          //invalid login credentials
        }
    }, (err) => {
        this.signUpPopUpMsg = "Somthing went wrong please try after sometime";
        this.signUpPopUpTitle = "Error";
        this.modalRef.hide();
        this.modalRef = this.modalService.show(this.confirmModal);
        console.log(err);
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