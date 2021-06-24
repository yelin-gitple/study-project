import { USER } from './../content';
import { Component, OnInit } from '@angular/core';
import { BlogListService } from '../../service/blog-list.service';
import { BLOG_ITEM } from '../content';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  blogList: BLOG_ITEM[] = [];

  constructor(
    private blogListService: BlogListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBlogList();

    if (localStorage.getItem(USER) === 'undefined') {
      this.router.navigateByUrl("/signIn")
    }
  }

  getBlogList() {
    this.blogListService
      .getBlogList()
      .subscribe((blogList) => (this.blogList = blogList));
  }
}
