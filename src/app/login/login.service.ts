import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from './login.module';
import { Observable } from 'node_modules/rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { Account } from '../account/account.module';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = "http://localhost:8181/authenticate";
  constructor(private http: HttpClient) { }

  authenticate(login: Login): Observable<Account[]> {
    return this.http.post<Account[]>(this.url, login, httpOptions);
  }
}
