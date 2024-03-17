import { AccountForCreation } from '../../_interfaces/account-for-creation.model';
import { AccountForUpdate } from '../../_interfaces/account-for-update.model';
import { Account } from './../../_interfaces/account.model';
import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountRepositoryService {

  constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

  public getAccounts = (route: string) => {
    return this.http.get<Account[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public getAccount = (route: string) => {
    return this.http.get<Account>(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  public createAccount = (route: string, account: AccountForCreation) => {
    return this.http.post<Account>(this.createCompleteRoute(route, this.envUrl.urlAddress), account, this.generateHeaders());
  }

  public updateAccount = (route: string, account: AccountForUpdate) => {
    console.log(route);
    console.log(account);
    return this.http.put(this.createCompleteRoute(route, this.envUrl.urlAddress), account, this.generateHeaders());
  }

  public deleteAccount = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
