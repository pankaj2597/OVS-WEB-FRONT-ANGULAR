import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/authService/auth.service';
import { AdminServiceService } from '../services/adminService/admin-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(private authService:AuthService,
              private adminService:AdminServiceService) {}

  ngOnInit() {
    
  }

  logOut(){
    this.authService.logOut();
  }

}
