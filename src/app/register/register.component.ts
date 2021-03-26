import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public userservice:UserService) { }



  ngOnInit(): void {
  }

  onSubmit(F:NgForm)
  {
    console.log(F.value);
    this.userservice.addNewUser(F.value).subscribe((res)=>{
      console.log(res);
    },(err)=>{
        console.log(err);
    })
  }

}
