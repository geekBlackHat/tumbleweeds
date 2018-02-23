import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

  constructor(private _router: Router) { 

  }

  ngOnInit() {
  }

  cyptoDesk()
  {
    //localStorage.removeItem('userID');
    this._router.navigateByUrl("/"); 
  }
  
  profile() {
    this._router.navigateByUrl("profile");
  }
  signOut(){
    localStorage.removeItem('userID');
    this._router.navigateByUrl("/");
  }

  dashboard()
  {
    this._router.navigateByUrl("dashboard");
  }
}
