import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../services/adminService/admin-service.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private url = "http://localhost:7781/ovs/api";
  public $locations = new Subject();
  constructor(private _http:HttpClient,
              private adminService:AdminServiceService) { }

  ngOnInit() {
    this._http.get(this.url+'/getLocations').subscribe((response)=>{
      this.$locations.next(response['locations']);
    });
  }

}
