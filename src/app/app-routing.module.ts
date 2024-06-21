import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { UserListComponent } from './user-list/user-list.component';
const routes: Routes = [
  { path: 'first', component: FirstComponent },
  { path: 'user', component: UserListComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
