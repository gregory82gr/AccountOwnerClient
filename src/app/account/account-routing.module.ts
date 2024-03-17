import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountListComponent } from './account-list/account-list.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountDeleteComponent } from './account-delete/account-delete.component';
import { AccountUpdateComponent } from './account-update/account-update.component';

const routes: Routes = [
  { path:'list', component: AccountListComponent },
  { path: 'create', component: AccountCreateComponent },
  { path: 'update/:id', component: AccountUpdateComponent },
  { path: 'delete/:id', component: AccountDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
