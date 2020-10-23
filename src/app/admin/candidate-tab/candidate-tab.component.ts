import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AdminServiceService } from 'src/app/services/adminService/admin-service.service';
import { FormGroupDirective } from '@angular/forms';
import { AdminComponent } from '../admin.component';

@Component({
  selector: 'app-candidate-tab',
  templateUrl: './candidate-tab.component.html',
  styleUrls: ['./candidate-tab.component.css']
})
export class CandidateTabComponent implements OnInit {
  locationsList:any=[];
  partyLogo : any;
  hideImg:boolean=false;
  @ViewChild('candidateForm',{static:false}) candidateForm : FormGroupDirective;
  constructor(private adminService:AdminServiceService,
              private admin : AdminComponent) { 
      this.admin.$locations.subscribe((locations)=>{
        this.locationsList = locations;
      });
  }

  ngOnInit() {
   
  }

  selectImage(event){
    let image = event.target.files[0];
    let imageName = image.name;
    const formData = new FormData()
    formData.append('image',image,imageName);
    this.hideImg = true;
    this.adminService.uploadImage(formData)
                .subscribe((response)=>{
                  if(response['status'] == 200){
                    this.hideImg = false;
                    this.partyLogo = response['file']
                  }
                })
  }
  addCandidate(){
    if(this.candidateForm.valid){
      this.candidateForm.value.partyLogo = this.partyLogo;
      this.adminService.addCandidate(this.candidateForm.value);
      this.candidateForm.resetForm();
      this.partyLogo ='';
      document.querySelector('select').value = '';
    }
  }

}
