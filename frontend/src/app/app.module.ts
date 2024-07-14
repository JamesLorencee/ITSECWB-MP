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
import { AdminTestComponent } from './page-schema/admin/test/test.component';
import { UserHomeComponent } from './page-schema/user/home/home.component';
import { UserTestComponent } from './page-schema/user/test/test.component';
import { IncomeLogComponent } from './income-log/income-log.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';

// NPM Modules
import { NgIconsModule } from '@ng-icons/core';
import * as MaterialIconsOutline from '@ng-icons/material-icons/outline';
import * as MaterialIconsRound from '@ng-icons/material-icons/round';
import * as MaterialIconsSharp from '@ng-icons/material-icons/sharp';

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
    MainTemplateComponent,
    IncomeLogComponent,
    GenerateReportComponent,
  ],
  imports: [
    BrowserModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
