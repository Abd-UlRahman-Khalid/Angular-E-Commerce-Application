import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  userData: any = null;
  private readonly router = inject(Router);

  sendRegisterForm(data: Object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }
  sendLogginForm(data: Object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);

      console.log('user Data:', this.userData);
    }
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    // call API remove token
    // navigate login
    this.router.navigate(['/login']);
  }

  setEmailVerify(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }
  setCodeVerify(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }
  setResetPassword(data: object): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
  getUserData(): any {
    this.userData = jwtDecode(localStorage.getItem('userToken')!);
    console.log(this.userData);
    return this.userData;
  }
}
