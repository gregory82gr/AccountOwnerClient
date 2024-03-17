import { Component } from '@angular/core';
import { Account } from '../../_interfaces/account.model';
import { AccountRepositoryService } from '../../shared/services/account-repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent  {
 accounts: Account[];
 errorMessage: string = '';
 accountType:string='';
 owner:string='';

 constructor(private repository:AccountRepositoryService,
            private errorHandler: ErrorHandlerService,
            private router: Router) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  private getAllAccounts = () => {
    const apiAddress: string = 'api/account';
    this.repository.getAccounts(apiAddress)
    .subscribe({
      next: (account: Account[]) => this.accounts = account,
      error: (err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          this.errorMessage = this.errorHandler.errorMessage;
      }
    })
  }

  public redirectToDeletePage = (id) => {
    const deleteUrl: string = `/account/delete/${id}`;
    console.log(deleteUrl);
    this.router.navigate([deleteUrl]);
  }

  public redirectToUpdatePage = (id) => {
    const updateUrl: string = `/account/update/${id}`;
    console.log(updateUrl);
    this.router.navigate([updateUrl]);
  }
}
