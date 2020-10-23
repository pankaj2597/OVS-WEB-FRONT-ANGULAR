import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  getAccessToken():string{
    const token = localStorage.getItem('token');
    if(token){
      return token;
    }
  }

  saveAccessToken(token:string){
    localStorage.setItem('token',token);
  }

  logOut(){
    const token = this.getAccessToken();
    if(token){
      localStorage.removeItem('token');
      this.router.navigateByUrl('');
    }
  }

  isLoggedIn():boolean{
    const token = this.getAccessToken();
    return token ? true : false;
  }
}
