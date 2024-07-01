// src/app/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/users/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: {username: string, password: string}): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });

    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(response => {
        console.log('Logged in successfully');
        localStorage.setItem('token', response.token);
        this.router.navigate(['/user']);
      })
    )
  }

  // logout() {
  //   localStorage.removeItem('token');
  //   this.router.navigate(['/login']);
  // }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token');
  // }
}
