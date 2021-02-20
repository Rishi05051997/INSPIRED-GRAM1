import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AddpostComponent } from './pages/addpost/addpost.component';
import { PageNotFOundComponent } from './pages/page-not-found/page-not-found.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule } from '@angular/forms';

import { environment } from "src/environments/environment";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { PostComponent } from './components/post/post.component';





@NgModule({
  declarations: [
    AppComponent,
   
    UserComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddpostComponent,
    PageNotFOundComponent,
    SigninComponent,
    SignupComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // AngularFontAwesomeModule,
   

    BrowserAnimationsModule,
    ToastrModule.forRoot(),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
