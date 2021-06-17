import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_INFO } from './content';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     Authorization: 'my-auth-token',
//     'Access-Control-Allow-Origin': '*',
//   }),
// };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  registerUserInfo(userInfo: USER_INFO): Observable<USER_INFO> {
    console.log(userInfo)
    return this.http
      .post<USER_INFO>(`${this.authUrl}/signUp`, userInfo)
      .pipe(catchError(this.handleError<USER_INFO>('registerUserInfo')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
