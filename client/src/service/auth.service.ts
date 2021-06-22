import { MessageService } from './message.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USER_INFO, USER_ID_PW } from '../app/content';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/api/users';
  private log(message: string) {
    this.messageService.add(`⚠️ Error: ${message}`);
  }
  errorMessage: string = '';
  redirectUrl: string | null = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  signUp(userInfo: USER_INFO): Observable<USER_INFO> {
    return this.http.post<USER_INFO>(`${this.authUrl}/signUp`, userInfo).pipe(
      tap((_) => this.log(`signUp`)),
      catchError(this.handleError<USER_INFO>('signUp'))
    );
  }

  signIn(userId: string, password: string): Observable<USER_ID_PW> {
    return this.http
      .post<USER_ID_PW>(`${this.authUrl}/signIn`, { userId, password })
      .pipe(
        tap((_) => this.log(`signIn`)),
        catchError(this.handleError<USER_ID_PW>('signIn'))
      );
  }

  getCurrentUser(token: string): Observable<any> {
    
    return this.http
      .get(`${this.authUrl}/current`, {
        headers: new HttpHeaders({
          Authorization: token,
        }),
      })
      .pipe(
        tap((_) => this.log(`getCurrentUser`)),
        catchError(this.handleError<USER_ID_PW>('getCurrentUser'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.errorMessage = error.error.message;
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
