import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService implements OnInit{
  private httpClient : HttpClient;
  private url = "http://localhost:7781/ovs/api";
  public locationsList:any=[];
  constructor(private _http:HttpClient,
              private httpBackend : HttpBackend,
              private router:Router,
                private authService:AuthService) {
    this.httpClient = new HttpClient(httpBackend);
   }

  ngOnInit(){
    
  }

  addLocation(location){
    this._http.post(this.url+'/addLocation',location).subscribe((response)=>{

    });
  }

  uploadImage(formData){
    return this._http.post(this.url+'/upload',formData);
  }

  addCandidate(candidate){
    this._http.post(this.url+'/addCandidate',candidate).subscribe((response)=>{
      
    });    
  }

  addUser(user){
    this._http.post(this.url+'/addUser',user).subscribe((response)=>{
      
    });
  }

  adminLogin(data){
    this.httpClient.post(this.url+"/login",data,{observe:'response',responseType:'text'})
      .subscribe((res)=>{
        this.authService.saveAccessToken(res.headers.get('X-Access-Token'));
        this.router.navigateByUrl('/admin');
      })
  }

  getResults(){
    return this._http.get(this.url+"/result");
  }
}
