import { Component, OnInit } from '@angular/core';
import { Login } from '../login/login.module';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { Plan } from '../account/plan.module';
import { Account } from '../account/account.module';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService,
    private router: Router,
    private accountService: AccountService) { }
  data: any;
  isLoggedIn: boolean = false;
  // store the URL so we can redirect after logging in
  public redirectUrl: string = "/account";
  accounts: Account[];
  plans: Plan[];
  ngOnInit() {
    this.accounts = this.accountService.getAccounts();
  }

  openLoginModalForm() {
    document.getElementById('loginFormId').style.display = 'block';
  }

  onSubmit(data) {
    let login: Login = JSON.parse(JSON.stringify(data));
    this.data = JSON.stringify(data);
    console.log(this.data);
    console.log(login.userName + "  >>  " + login);
    this.loginService.authenticate(login).subscribe(
      accounts => {
        this.accountService.setAccounts(accounts);      
        this.isLoggedIn = true;
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = null;
        }
        document.getElementById('loginFormId').style.display = 'none';
      },
      error => console.log(error)
    );
  }

}
