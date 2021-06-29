import { BLOG_ITEM } from '../app/content';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ObjectId } from 'mongoose';

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
  private blogListUrl = 'http://localhost:3000/api/blogList';

  constructor(private http: HttpClient) {}

  getBlogList(): Observable<BLOG_ITEM[]> {
    return this.http
      .get<BLOG_ITEM[]>(`${this.blogListUrl}`, httpOptions)
      .pipe(catchError(this.handleError<BLOG_ITEM[]>('getBlogList', [])));
  }

  getBlogItem(id: any): Observable<BLOG_ITEM> {
    const url = `${this.blogListUrl}/${id}`;

    return this.http
      .get<BLOG_ITEM>(url)
      .pipe(catchError(this.handleError<BLOG_ITEM>(`getBlogItem id=${id}`)));
  }

  addPost(blog: BLOG_ITEM): Observable<BLOG_ITEM> {
    return this.http
      .post<BLOG_ITEM>(`${this.blogListUrl}`, blog)
      .pipe(catchError(this.handleError<BLOG_ITEM>('addPost')));
  }

  updateBlogItem(blogItem: BLOG_ITEM): Observable<BLOG_ITEM> {
    const url = `${this.blogListUrl}/${blogItem._id}`;
    return this.http
      .put<BLOG_ITEM>(url, blogItem)
      .pipe(catchError(this.handleError<BLOG_ITEM>('updateBlogItem')));
  }

  deleteBlogItem(id: ObjectId | undefined): Observable<BLOG_ITEM> {
    const url = `${this.blogListUrl}/${id}`;

    return this.http
      .delete<BLOG_ITEM>(url)
      .pipe(catchError(this.handleError<BLOG_ITEM>('deleteBlogItem')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
