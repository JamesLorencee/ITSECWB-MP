import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared.module';

// Schematics
import { MainTemplateComponent } from './schematics/main-template/main-template.component';
import { PageSchemaComponent } from './page-schema/page-schema.component';

// Pages
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminHomeComponent } from './page-schema/admin/home/home.component';
import { UserHomeComponent } from './page-schema/user/home/home.component';
import { IncomeLogComponent } from './page-schema/user/income-log/income-log.component';
import { UserLogsComponent } from './page-schema/admin/user-logs/user-logs.component';

// NPM Modules
import { NgIconsModule } from '@ng-icons/core';
import * as MaterialIconsOutline from '@ng-icons/material-icons/outline';
import * as MaterialIconsRound from '@ng-icons/material-icons/round';
import * as MaterialIconsSharp from '@ng-icons/material-icons/sharp';

// Material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
//Calendar Import
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    UserHomeComponent,
    PageSchemaComponent,
    MainTemplateComponent,
    IncomeLogComponent,
    UserLogsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgIconsModule.withIcons({
      ...MaterialIconsOutline,
      ...MaterialIconsRound,
      ...MaterialIconsSharp,
    }),
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
