import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// services...
import { AuthService } from 'src/app/services/auth.service';

import { NgForm } from "@angular/forms";

import { finalize } from "rxjs/operators";

// import { v4 } from "uuid";

// firebase
import { AngularFireStorage  } from "@angular/fire/storage";
import { AngularFireDatabase } from "@angular/fire/database";
import { from } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  
  locationName :any;
  description :any;
  picture : any;
  user :any =0;
  uploadPercent:number=0;


  constructor(
    private toastr : ToastrService,
    private auth : AuthService,
    private router : Router,
    private db : AngularFireDatabase,
    private storage : AngularFireStorage,
    
  ) {
    auth.getUser().subscribe((user)=>{
      this.db.object(`/users/${user?.uid}`)
      .valueChanges()
      .subscribe((user)=>{
        this.user = user;
      })
    })
   }

  ngOnInit(): void {
  }
  onSubmit(){
    const uid = null;
    this.db.object(`/posts/${uid}`)
    .set({
      id:uid,
      locationName: this.locationName,
      decription: this.description,
      picture: this.picture,
      by:this.user.name,
      instaId: this.user.instaUserName,
      date: Date.now()

    })
    .then(()=>{
      this.toastr.success('Post Added Successfully...')
      this.router.navigateByUrl('/')
    })
    .catch((err)=>{
      this.toastr.error('Opps')
    })
  }
  async uploadFile(event:any){
    const file =  event.target.files[0];
    // let resizedImage = await readAndCompressImage(file, imageConfig);

    const filePath = file.name; // rename the image with TODO: UUID
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(filePath, file);

    task.percentageChanges().subscribe((percetage:any) => {
      this.uploadPercent = percetage;
    });

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.picture = url;
            this.toastr.success("image upload success");
          });
        }),
      )
      .subscribe();
  }
}
