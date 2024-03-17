import { Component, OnInit } from '@angular/core';
import { AccountRepositoryService } from '../../shared/services/account-repository.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Owner } from './../../_interfaces/owner.model';
import { AccountForUpdate } from '../../_interfaces/account-for-update.model';
import { ErrorHandlerService } from '../../shared//services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from '../../shared/modals/success-modal/success-modal.component';
import { Account } from '../../_interfaces/account.model';
@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrl: './account-update.component.css'
})
export class AccountUpdateComponent implements OnInit{

  account: Account;
  accountForm: FormGroup;
  bsModalRef?:BsModalRef;
  IsReadonly=false;

  constructor(private repository: AccountRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private activeRoute: ActivatedRoute, private datePipe: DatePipe,
    private modal: BsModalService) { }

    ngOnInit(): void {
      this.accountForm = new FormGroup({
        dateCreated: new FormControl('', [Validators.required]),
        accountType: new FormControl('', [Validators.required]),
        ownerId: new FormControl(this.activeRoute.snapshot.paramMap.get('ownerId'), [Validators.required])
      });
      this.getAccountById();
    }

    private getAccountById = () => {
      const accountId: string = this.activeRoute.snapshot.params['id'];
      const accountByIdUri: string = `api/account/${accountId}`;

      this.repository.getAccount(accountByIdUri)
      .subscribe({
        next: (acc: Account) => {
          this.account = { ...acc,
            dateCreated: new Date(this.datePipe.transform(acc.dateCreated, 'MM/dd/yyyy'))
          };
          this.accountForm.patchValue(this.account);
        },
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
    }

    validateControl = (controlName: string) => {


      if (this.accountForm.get(controlName).value=="0"){
        return true;
      }

      if (this.accountForm.get(controlName).invalid && this.accountForm.get(controlName).touched)
        return true;
      if (!this.accountForm.get(controlName).invalid && !this.accountForm.get(controlName).touched){
        if( controlName=='ownerId' && this.activeRoute.snapshot.paramMap.get('ownerId')!=null){
          console.log(this.IsReadonly);
          this.IsReadonly=true;
          console.log(this.IsReadonly);
        }
      }

      return false;
    }
    hasError = (controlName: string, errorName: string) => {
      if (this.accountForm.get(controlName).hasError(errorName))
        return true;

      return false;
    }

    public updateAccount = (accountFormValue) => {
      if (this.accountForm.valid)
        this.executeAccountUpdate(accountFormValue);
    }

    private executeAccountUpdate = (accountFormValue) => {
      const accountForUpd: AccountForUpdate = {
        accountType: accountFormValue.accountType,
        dateCreated: this.datePipe.transform(accountFormValue.dateCreated, 'yyyy-MM-dd'),
        ownerId: accountFormValue.ownerId
      }

      const apiUri: string = `api/account/${this.account.id}`;

      this.repository.updateAccount(apiUri, accountForUpd)
      .subscribe({
        next: (_) => {
          const config: ModalOptions = {
            initialState: {
              modalHeaderText: 'Success Message',
              modalBodyText: 'Account updated successfully',
              okButtonText: 'OK'
            }
          };

          this.bsModalRef = this.modal.show(SuccessModalComponent, config);
          this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToAccountList());
        },
        error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
      })
    }

    public redirectToAccountList = () => {
      this.router.navigate(['/account/list']);
    }
}
