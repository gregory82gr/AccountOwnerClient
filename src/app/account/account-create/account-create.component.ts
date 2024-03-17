import { SuccessModalComponent } from './../../shared/modals/success-modal/success-modal.component';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { OwnerRepositoryService } from './../../shared/services/owner-repository.service';
import { AccountRepositoryService } from '../../shared/services/account-repository.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalOptions, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Owner } from '../../_interfaces/owner.model';
import { OwnerForCreation } from '../../_interfaces/owner-for-creation.model';
import { AccountForCreation } from '../../_interfaces/account-for-creation.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Account } from '../../_interfaces/account.model';


@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrl: './account-create.component.css'
})
export class AccountCreateComponent implements OnInit {

  errorMessage: string = '';
  accountForm: FormGroup;
  bsModalRef?: BsModalRef;
  IsReadonly=false;

  constructor(private repository: AccountRepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private datePipe: DatePipe, private modal: BsModalService ,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.accountForm = new FormGroup({
      dateCreated: new FormControl('', [Validators.required]),
      accountType: new FormControl('', [Validators.required]),
      ownerId: new FormControl(this.route.snapshot.paramMap.get('ownerId'), [Validators.required])
    });
  }

  validateControl = (controlName: string) => {


    if (this.accountForm.get(controlName).value=="0"){
      return true;
    }

    if (this.accountForm.get(controlName).invalid && this.accountForm.get(controlName).touched)
      return true;
    if (!this.accountForm.get(controlName).invalid && !this.accountForm.get(controlName).touched){
      if( controlName=='ownerId' && this.route.snapshot.paramMap.get('ownerId')!=null){
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

  createAccount = (accountFormValue) => {
    if (this.accountForm.valid)
      this.executeAccountCreation(accountFormValue);
  }

  private executeAccountCreation = (accountFormValue) => {
    const account: AccountForCreation = {
      accountType: accountFormValue.accountType,
      dateCreated: this.datePipe.transform(accountFormValue.dateCreated, 'yyyy-MM-dd'),
      ownerId: accountFormValue.ownerId
    }
    const apiUrl = 'api/account';
    this.repository.createAccount(apiUrl, account)
    .subscribe({
      next: (account: Account) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Account: ${account.accountType} created successfully`,
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToAccountList());
      },
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })

  }

  redirectToAccountList = () => {
    this.router.navigate(['/account/list']);
  }

}
