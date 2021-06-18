import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_INFO, USER_ID_PW } from '../app/content';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  signUp(userInfo: USER_INFO): Observable<USER_INFO> {
    return this.http
      .post<USER_INFO>(`${this.authUrl}/signUp`, userInfo)
      .pipe(catchError(this.handleError<USER_INFO>('signUp')));
  }

  signIn(userId: string, password: string): Observable<USER_ID_PW> {
    return this.http
      .post<USER_ID_PW>(`${this.authUrl}/signIn`, { userId, password })
      .pipe(catchError(this.handleError<USER_ID_PW>('signIn')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
