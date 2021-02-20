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
// browser image resizer 
// import { readAndCompressImage } from 'browser-image-resizer';
import { imageConfig } from 'src/utils/config';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  picture: string =
    "https://learnyst.s3.amazonaws.com/assets/schools/2410/resources/images/logo_lco_i3oab.png";

  uploadPercent: number = 0;

  constructor(
    private toastr : ToastrService,
    private auth : AuthService,
    private router : Router,
    private db : AngularFireDatabase,
    private storage : AngularFireStorage,
    
  ) { }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    const {email, password, username, country, bio, name} = f.form.value;

    this.auth.signUp(email, password)
    .then((res:any)=>{
      console.log(res);
      const {uid} = res?.user;

      this.db.object(`/users/${uid}`)
      .set ({
        id:uid,
        name: name,
        email : email,
        instaUserName: username,
        country: country,
        bio: bio,
        picture: this.picture
      })
    })
    .then(()=>{
      this.router.navigateByUrl('/');
      this.toastr.success('Signup Success');
    })
    .catch((err)=>{
      this.toastr.error('Signup failed...')
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
