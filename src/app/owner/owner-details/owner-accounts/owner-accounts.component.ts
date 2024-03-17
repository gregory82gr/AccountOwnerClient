import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from '../../../_interfaces/account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-accounts',
  templateUrl: './owner-accounts.component.html',
  styleUrl: './owner-accounts.component.css'
})
export class OwnerAccountsComponent implements OnInit{

  @Input() accounts:Account[];
  @Output() onAccountClick: EventEmitter<Account> = new EventEmitter();

  constructor(private router: Router){}

  ngOnInit(): void {

  }

  onAccountClicked = (account: Account) => {
    this.onAccountClick.emit(account);
  }

  public redirectToDeletePage = (id) => {
    const deleteUrl: string = `/account/delete/${id}`;
    console.log(deleteUrl);
    this.router.navigate([deleteUrl]);
  }
}
