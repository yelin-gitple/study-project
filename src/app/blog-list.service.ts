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

  getBlogItem(id: number): Observable<BLOG_ITEM> {
    const blogItem = BLOG_LIST.find((item) => item.id === id)!;
    return of(blogItem);
  }
}
