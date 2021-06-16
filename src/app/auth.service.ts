import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUserInfo(userInfo: any) {
    return this.http.get(`${this.authUrl}/signUp`);
  }
}
