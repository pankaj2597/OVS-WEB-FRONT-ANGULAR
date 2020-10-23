import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../authService/auth.service';
import { AlertMessage } from 'src/app/utils/snackbar/snackbar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:7781/ovs/api";
  userData:any;
  private httpClient : HttpClient;
  constructor(private _http:HttpClient,
              private router:Router,httpBackend : HttpBackend,
              private authService:AuthService,
              private alert:AlertMessage) {
                this.httpClient = new HttpClient(httpBackend);
               }

  loginUser(aadharId){
    this.httpClient.post(this.url+'/getUser',{"aadharId":aadharId},{observe:'response',responseType:'text'})
    .subscribe((response)=>{
      const res = JSON.parse(response.body);
      if(response["status"] == 200 && !res['isVoted']){
        this.authService.saveAccessToken(response["headers"].get('X-Access-Token'));
        this.userData = res.user;
        this.router.navigateByUrl('/user');
      }else{
        this.alert.showSuccessAlert(res.msg,'');
      }
 })
}

addVote(data){
  this._http.put(this.url+"/addVote",data,{observe:'response'})
      .subscribe((response)=>{
        if(response['status'] == 200){
          this.authService.logOut();
        }
    })
}
}
