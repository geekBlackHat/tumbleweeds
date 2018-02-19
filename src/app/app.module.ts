import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule,CanDeactivate } from '@angular/router' ;
import { FormsModule }   from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './Component/home/home.component';
import { BsModalService } from 'ngx-bootstrap/modal';


import { AppComponent } from './app.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { UserNavComponent } from './Component/user-nav/user-nav.component';


@NgModule({
  declarations: [
    AppComponent, HomeComponent, DashboardComponent, ProfileComponent, UserNavComponent
  ],
  imports: [
    BrowserModule,FormsModule,RouterModule.forRoot([
      { path:'dashboard',component:DashboardComponent },
      { path:'profile',component:ProfileComponent },
      { path:'**',component:HomeComponent }
    ]),ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
