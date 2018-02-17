import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile = {
    "FirstName": "Anurag",
    "LastName": "Sharma",
    "Email": "anurag@gmail.com",
    "Password": "12345",
    "MobileNumber": "1234567890",
  };
  constructor() { }

  ngOnInit() {

  }

   
  

}
