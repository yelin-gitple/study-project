import { Component, OnInit } from '@angular/core';
import { BlogListService } from '../blog-list.service';
import { BLOG_ITEM } from '../content';
import { BLOG_LIST } from '../mock-contents';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  blogList: BLOG_ITEM[] = BLOG_LIST;

  constructor(private blogListService: BlogListService) {}

  ngOnInit(): void {
    this.getBlogList();
    console.log(this.getBlogList());
  }

  getBlogList() {
    this.blogListService
      .getBlogList()
      .subscribe((blogList) => (this.blogList = blogList));
  }
}
