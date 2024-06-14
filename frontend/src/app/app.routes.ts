import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminHomeComponent } from './page-schema/admin/home/home.component';
import { UserHomeComponent } from './page-schema/user/home/home.component';
import { RoleGuardService } from './guards/role-guard.guard';
import { PageSchemaComponent } from './page-schema/page-schema.component';
import { LoginGuard } from './guards/login-guard.guard';
import { AdminTestComponent } from './page-schema/admin/test/test.component';
import { UserTestComponent } from './page-schema/user/test/test.component';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  {
    path: 'admin',
    component: PageSchemaComponent,
    canActivate: [RoleGuardService],
    data: { isAdmin: true },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        component: AdminHomeComponent,
        canActivate: [RoleGuardService],
        data: { isAdmin: true },
      },
      {
        path: 'damn',
        component: AdminTestComponent,
        canActivate: [RoleGuardService],
        data: { isAdmin: true },
      },
    ],
  },
  {
    path: 'user',
    component: PageSchemaComponent,
    canActivate: [RoleGuardService],
    data: { isAdmin: false },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        component: UserHomeComponent,
        canActivate: [RoleGuardService],
        data: { isAdmin: false },
      },
      {
        path: 'damn',
        component: UserTestComponent,
        canActivate: [RoleGuardService],
        data: { isAdmin: false },
      },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
