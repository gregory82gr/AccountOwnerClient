import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccountRoutingModule } from './account-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountDeleteComponent } from './account-delete/account-delete.component';
import { AccountUpdateComponent } from './account-update/account-update.component';
import { FormsModule } from '@angular/forms';
import { TableFilterOwnerPipe } from '../Utils/table-filter-owner.pipe';
import { TableFilterAccountTypePipe } from '../Utils/table-filter-accounttype.pipe';



@NgModule({
  declarations: [
    AccountListComponent,
    AccountCreateComponent,
    AccountDeleteComponent,
    AccountUpdateComponent,
    TableFilterOwnerPipe,
    TableFilterAccountTypePipe
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    BsDatepickerModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AccountModule { }
