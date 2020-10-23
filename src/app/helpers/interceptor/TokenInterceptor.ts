import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { Observable, from, ObservableInput, throwError, observable} from 'rxjs';
import { AuthService } from 'src/app/services/authService/auth.service';
import {retry,catchError, map} from 'rxjs/operators';
import { AlertMessage } from 'src/app/utils/snackbar/snackbar';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
    constructor(private authService : AuthService,
                private alert:AlertMessage,
                private router:Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getAccessToken();
        req = req.clone({
            setHeaders:{
                'X-Access-Token':token,
                'Access-Control-Allow-Origin':'*'
            }
        })
        
        return next.handle(req).pipe(
            retry(1),
            map((event:HttpEvent<any>)=>{
                if(event instanceof HttpResponse){
                    var response = event.body;
                    if(response.status == 200 && response.msg){
                        this.alert.showSuccessAlert(response.msg,'');
                    }
                }
                return event;
            }),
            catchError((e:HttpEvent<any>)=>{
                let errorMsg = e['error'];
                if(errorMsg.status == 400 || errorMsg.status == 500){
                    this.alert.showErrorAlert(errorMsg.msg,'');
                }
                if(errorMsg.status == 401){
                    this.router.navigateByUrl('');
                    this.alert.showErrorAlert(errorMsg.msg,'');
                }
                return throwError(e);
            })
        )
                
    }
}