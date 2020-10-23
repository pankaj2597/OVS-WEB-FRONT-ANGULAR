import { Component, OnInit, Input } from '@angular/core';
import { AdminServiceService } from 'src/app/services/adminService/admin-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminComponent } from '../admin.component';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css']
})
export class UserTabComponent implements OnInit {
  locationsList:any=[];
  userForm:FormGroup;
  constructor(private adminService:AdminServiceService,
    private admin :AdminComponent) { 
    this.admin.$locations.subscribe((locations)=>{
      this.locationsList = locations;  
    });

    this.userForm = new FormGroup({
      name:new FormControl('',Validators.required),
      aadharId:new FormControl('',Validators.maxLength(12)),
      age:new FormControl('',Validators.min(18)),
      location:new FormControl('',Validators.required)
    })
  }

  ngOnInit() {
    
  }

  addUser(){
    if(this.userForm.valid){
      this.adminService.addUser(this.userForm.value);
      this.userForm.reset();
      document.querySelector('select').value = '';
    }
  }

}
