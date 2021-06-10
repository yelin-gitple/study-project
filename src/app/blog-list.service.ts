import { BLOG_ITEM } from './content';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BLOG_LIST } from './mock-contents';

@Injectable({
  providedIn: 'root',
})
export class BlogListService {
  constructor() {}

  getBlogList(): Observable<BLOG_ITEM[]> {
    const blogList = of(BLOG_LIST);
    return blogList;
  }
}
