import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/services/adminService/admin-service.service';

@Component({
  selector: 'app-results-tab',
  templateUrl: './results-tab.component.html',
  styleUrls: ['./results-tab.component.css']
})
export class ResultsTabComponent implements OnInit {

  results:any=[];
  constructor(private adminService:AdminServiceService) {
    this.adminService.getResults().subscribe((response)=>{
      this.results = response["results"];
    });
    
   }

  ngOnInit() {
  }

}
