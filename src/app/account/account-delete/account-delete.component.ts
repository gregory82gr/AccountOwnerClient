import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { AccountRepositoryService } from '../../shared/services/account-repository.service';
import { Owner } from './../../_interfaces/owner.model';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import { SuccessModalComponent } from '../../shared/modals/success-modal/success-modal.component';
import { Account } from '../../_interfaces/account.model';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrl: './account-delete.component.css'
})
export class AccountDeleteComponent  implements OnInit{

  account: Account;
  bsModalRef?: BsModalRef;
  constructor(private repository: AccountRepositoryService, private errorHandler: ErrorHandlerService,
  private router: Router, private activeRoute: ActivatedRoute, private modal: BsModalService) { }

  ngOnInit(): void {
      this.getAccountById();
  }

  private getAccountById = () => {
    const accountId: string = this.activeRoute.snapshot.params['id'];
    const apiUri: string = `api/account/${accountId}`;

    this.repository.getAccount(apiUri)
    .subscribe({
      next: (account: Account) => this.account = account,
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

  redirectToAccountList = () => {
    this.router.navigate(['/account/list']);
  }

  deleteAccount = () => {
    const deleteUri: string = `api/account/${this.account.id}`;

    this.repository.deleteAccount(deleteUri)
    .subscribe({
      next: (_) => {
        const config: ModalOptions = {
          initialState: {
            modalHeaderText: 'Success Message',
            modalBodyText: `Account deleted successfully`,
            okButtonText: 'OK'
          }
        };

        this.bsModalRef = this.modal.show(SuccessModalComponent, config);
        this.bsModalRef.content.redirectOnOk.subscribe(_ => this.redirectToAccountList());
      },
      error: (err: HttpErrorResponse) => this.errorHandler.handleError(err)
    })
  }

}
