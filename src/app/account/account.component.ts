import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { UpdatePlan } from './updatePlan.module';
import { Account } from './account.module';
import { Plan } from './plan.module';

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
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAccounts().subscribe(
      accounts => {
        this.accounts = accounts;
        this.accounts.forEach(account => {
          this.plans = account.myPlan.allPlans;
        });
      });
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
    console.log("planId: "+planId);
    this.planId = planId;
    this.accounts.forEach(account => {
      this.accountId = account.id;
    });
    console.log("planId: "+this.planId+" > "+this.accountId);
    this.accountService.subscribeNewPlan(this.accountId, this.planId).subscribe(
      account => {
        this.updatePlan = account;
        console.log("## "+this.updatePlan.myPlan.name);
        this.planName = account.myPlan.name;
      });
      document.getElementById('id01').style.display='none';
  }
}
