import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: 'first', component: FirstComponent },
  { path: 'user', component: UserListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
