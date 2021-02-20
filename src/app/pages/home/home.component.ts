import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// services...
import { AuthService } from 'src/app/services/auth.service';

import { NgForm } from "@angular/forms";

import { finalize } from "rxjs/operators";

// firebase
import { AngularFireStorage  } from "@angular/fire/storage";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users:any = [];
  posts:any = [];

  isLoading = false;

  constructor(
    private db: AngularFireDatabase,
    private toastr: ToastrService,
  ) {
    this.isLoading = true;

    //get all users
    db.object("/users")
      .valueChanges()
      .subscribe((obj:any) => {
        if (obj) {
          this.users = Object.values(obj);
          this.isLoading = false;
        } else {
          toastr.error("NO user found");
          this.users = [];
          this.isLoading = false;
        }
      });

    //grab all posts from firebase

    db.object("/posts")
      .valueChanges()
      .subscribe((obj:any) => {
        if (obj) {
          this.posts = Object.values(obj).sort((a:any, b:any) => b.date - a.date);
          this.isLoading = false;
        } else {
          toastr.error("NO post to display");
          this.posts = [];
          this.isLoading = false;
        }
      });
  }

  ngOnInit(): void {
  }

}
