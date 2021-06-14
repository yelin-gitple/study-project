import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogListUrl = 'api/blogList';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application.json' }),
  };

  constructor(private http:HttpClient) {}

  /* GET: blogList from the server */
}
