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
import { PageSchemaComponent } from './page-schema/page-schema.component';
import { AdminHomeComponent } from './page-schema/admin/home/home.component';
import { AdminTestComponent } from './page-schema/admin/test/test.component';
import { UserHomeComponent } from './page-schema/user/home/home.component';
import { UserTestComponent } from './page-schema/user/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    UserHomeComponent,
    PageSchemaComponent,
    AdminTestComponent,
    UserTestComponent,
  ],
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
