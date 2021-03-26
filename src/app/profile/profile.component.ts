import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userservice:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }
userid:any

UserDetails:any=[];
  ngOnInit() {

    // if(this.userservice.getToken())
    // {
    //   console.log(this.userservice.getToken());
    // }

    if(!this.userservice.isLoggedIn())
    {
      this.router.navigateByUrl('/');
    }


    this.userid=this.activatedRoute.queryParams.subscribe(params=>{
      this.userid=params['id'];
      console.log(this.userid);
      this.userservice.getselectedUser(this.userid).subscribe((res)=>{

        this.UserDetails=res;
        

        console.log(res);
      });
    },(err)=>{
      console.log(err);
    })
  }

}
