import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroupDirective } from '@angular/forms';
import { AdminServiceService } from 'src/app/services/adminService/admin-service.service';
import { AdminComponent } from '../admin.component';

@Component({
  selector: 'app-location-tab',
  templateUrl: './location-tab.component.html',
  styleUrls: ['./location-tab.component.css']
})
export class LocationTabComponent {
  @ViewChild('locationForm',{static:false}) locationForm:FormGroupDirective;
  private locations:any=[];
  isSpinner:boolean=true;
  constructor(private adminService:AdminServiceService,
              private admin:AdminComponent) { }

  addLocation(){
    if(this.locationForm.valid){
      this.isSpinner = false;
      this.locationForm.value.locationId = "TNE"+this.locationForm.value.locationId;
      this.adminService.addLocation(this.locationForm.value);
      this.locationForm.resetForm();
      this.admin.ngOnInit();
      this.isSpinner = true;
    }
  }

}
