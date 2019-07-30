import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { UpdatePlan } from './updatePlan.module';
import { Account } from './account.module';
import { Plan } from './plan.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accounts: Account[];
  updatePlan: UpdatePlan;
  plans: Plan[];
  pack: any;
  planName: string;
  planId: number;
  accountId: number;
  public redirectUrl: string = "/account";
  constructor(private accountService: AccountService,
    private router: Router) { }

  ngOnInit() {
    this.accounts = this.accountService.getAccounts();
    this.accounts.forEach(account => {
      this.plans = account.myPlan.allPlans;
    });
  }

  setAccounts(accounts: Account[]) {
    this.accounts = accounts;
  }

  openAccount(evt, cityName) {
    console.log(cityName);
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  showPacks(pack: any, planName: string, planId: number) {
    this.pack = pack;
    this.planName = planName;
    this.planId = planId;
    document.getElementById('id01').style.display = 'block';
  }

  subscribeNewPlan(planId: number) {
    console.log("planId: " + planId);
    this.planId = planId;
    this.accounts.forEach(account => {
      this.accountId = account.id;
    });
    console.log("planId: " + this.planId + " > " + this.accountId);
    this.accountService.subscribeNewPlan(this.accountId, this.planId).subscribe(
      account => {
        this.updatePlan = account;
        console.log("## " + this.updatePlan.myPlan.name);
        this.planName = account.myPlan.name;
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = null;
        }
      });
    document.getElementById('id01').style.display = 'none';
  }
}
