import { MatSnackBar } from '@angular/material/snack-bar';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class AlertMessage{
    constructor(private snackBar : MatSnackBar){}

    showSuccessAlert(message:string,action:string){
        this.snackBar.open(message,action,{
            horizontalPosition:"center",
            verticalPosition:"bottom",
            duration:2000,
            panelClass:'success'
        });
    }

    showErrorAlert(message:string,action:string){
        this.snackBar.open(message,action,{
            duration:2000,
            horizontalPosition:"center",
            verticalPosition:"bottom",
            panelClass:'danger'
        });
    }
}