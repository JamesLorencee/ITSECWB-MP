import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AdminHomeComponent } from './admin/home/home.component';
import { HomeComponent } from './user/home/home.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, AdminHomeComponent, HomeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
