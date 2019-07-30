import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Login } from './login.module';
import { Account } from '../account/account.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;    
  // store the URL so we can redirect after logging in
  public redirectUrl: string;
  account: Account;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(login: Login) {
    console.log(login.userName+"  >>  "+login.userName+" ## "+login.mobile);
    this.loginService.authenticate(login).subscribe(
      account => {
        this.isLoggedIn = true;
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = null;
        }
      },
      error => console.log(error)
    );
  }
}
