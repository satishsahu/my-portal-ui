import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'node_modules/rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from './account/account.module';

@Injectable({
  providedIn: 'root'
})
export class AccountService implements OnInit{
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  accounts: Account[];
  accountUrl: string = "http://localhost:8181/myPhone/9888888889";
  newPlanUrl: string;
  account:Account;

  constructor(private http: HttpClient) { }

  getAccounts(): Account[]{
    return this.accounts;
  }

  setAccounts(accounts: Account[]) {
    this.accounts = accounts;
  }

  subscribeNewPlan(accountId: number, planId: number): Observable<Account>{
    this.newPlanUrl = "http://localhost:8181/update/account/"+accountId+"/plan/"+planId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put<Account>(this.newPlanUrl, JSON.stringify(this.account));
  }
}
