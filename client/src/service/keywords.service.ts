import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { KEYWORD } from 'src/app/content';
import { HttpClient } from '@angular/common/http';
import { timeStamp } from 'console';

@Injectable({
  providedIn: 'root',
})
export class KeywordsService {
  private keywordsUrl = 'http://localhost:3000/api/keywords';

  constructor(private http: HttpClient) {}

  getKeywords(): Observable<KEYWORD> {
    return this.http
      .get<KEYWORD>(`${this.keywordsUrl}`)
      .pipe(catchError(this.handleError<KEYWORD>('getKeywords')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
