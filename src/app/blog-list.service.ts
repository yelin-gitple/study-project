import { BLOG_ITEM } from './content';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BLOG_LIST } from './mock-contents';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BlogListService {
  private blogListUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getBlogList(): Observable<BLOG_ITEM[]> {
    console.log(this.http);
    return this.http
      .get<BLOG_ITEM[]>(`${this.blogListUrl}/api/blogList`, httpOptions)
      .pipe(catchError(this.handleError<BLOG_ITEM[]>('getBlogList', [])));
  }

  getBlogItem(id: number): Observable<BLOG_ITEM> {
    const blogItem = BLOG_LIST.find((item) => item.id === id)!;
    return of(blogItem);
  }

  addPost(blog: BLOG_ITEM): Observable<BLOG_ITEM> {
    return this.http
      .post<BLOG_ITEM>(`${this.blogListUrl}/api/blogList`, blog)
      .pipe(catchError(this.handleError<BLOG_ITEM>('addPost')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
