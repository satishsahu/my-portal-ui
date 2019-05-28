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
  accountUrl: string = "http://aa504a575811011e996000a75b12f01e-299214544.us-east-1.elb.amazonaws.com:8181/myPhone/9888888889";
  newPlanUrl: string;
  account:Account;

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>(this.accountUrl);
  }

  subscribeNewPlan(accountId: number, planId: number): Observable<Account>{
    this.newPlanUrl = "http://aa504a575811011e996000a75b12f01e-299214544.us-east-1.elb.amazonaws.com:8181/update/account/"+accountId+"/plan/"+planId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put<Account>(this.newPlanUrl, JSON.stringify(this.account));
  }
}
