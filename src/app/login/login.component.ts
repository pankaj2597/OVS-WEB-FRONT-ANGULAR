import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/userService/user.service';
import { AdminServiceService } from '../services/adminService/admin-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('userForm',{static:false}) userForm:NgForm;
  @ViewChild("adminForm",{static:false}) adminForm:NgForm;

  header:String='User';
  showAdmin:boolean=false;
  showUser:boolean=true;
  isSpinner:boolean=true;

  constructor(private userService:UserService,
              private adminService : AdminServiceService) { }

  ngOnInit() {
  }

  toggle(){
    if(this.showAdmin){
      this.showAdmin = false;
      this.header = 'User'
    }else{
      this.showAdmin = true;
      this.header = 'Admin'
    }
  }

  userLogin(){
    if(this.userForm.valid){
      this.userService.loginUser(this.userForm.value.aadharId);
    }
  }

  adminLogin(){
    if(this.adminForm.valid){
      this.isSpinner = true;
     this.adminService.adminLogin(this.adminForm.value);
     this.isSpinner = false;
    }
  }

}
