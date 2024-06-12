import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminHomeComponent } from './admin/home/home.component';
import { HomeComponent } from './user/home/home.component';
import { RoleGuardService } from './guards/role-guard.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [RoleGuardService], data: { redirect: true } },
  { path: 'register', component: RegisterComponent, canActivate: [RoleGuardService], data: { redirect: true } },
  { path: 'admin', component: AdminHomeComponent, canActivate: [RoleGuardService], data: { isAdmin: true } },
  { path: 'home', component: HomeComponent, canActivate: [RoleGuardService], data: { isAdmin: false } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
