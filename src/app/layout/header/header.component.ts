import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email:any;
  constructor(
    private auth : AuthService,
    private router : Router,
    private toastr : ToastrService
  ) { 
   
   }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.auth.getUser().subscribe((user)=> {
      console.log("User is :"+ user);
      this.email = user?.email
    })
  }

  signOut(){
    try {
      this.auth.signOut();

      this.router.navigateByUrl("/signin")
      this.toastr.success('Logout successfully...')
      this.email = null;
    } catch (error) {
      this.toastr.error("Problem in signout")
    }
  }

}
