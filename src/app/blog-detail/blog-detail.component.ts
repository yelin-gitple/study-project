import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogListService } from '../blog-list.service';
import { BLOG_ITEM } from '../content';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  blogItem: BLOG_ITEM | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogListService: BlogListService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBlogItem();
  }

  getBlogItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.blogListService
      .getBlogItem(id)
      .subscribe((item) => (this.blogItem = item));
  }

  delete(blogItem: BLOG_ITEM) {
    this.blogListService.deleteBlogItem(blogItem._id).subscribe(() => {
      this.goToBack();
    });
  }

  goToBack(): void {
    this.location.back();
  }
}
