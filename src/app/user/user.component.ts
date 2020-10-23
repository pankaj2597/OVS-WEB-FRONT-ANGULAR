import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/userService/user.service';
import { DialogComponent } from '../utils/dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userData:any;
  constructor(private userService:UserService,
            private dialog:MatDialog) { }

  ngOnInit() {
    this.userData = this.userService.userData;
  }

  onClickVote(event){
    var elem = event.currentTarget;
    var candidateId = elem.getAttribute('id');
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{'title':"Are you sure you want to continue, this cannot be undone"}
    });

    dialogRef.afterClosed().subscribe((result)=>{
      if(result){
        var data ={
          id:candidateId,
          aadharId:this.userData.aadharId
        }
        this.userService.addVote(data);
      }
    })
  }

}
