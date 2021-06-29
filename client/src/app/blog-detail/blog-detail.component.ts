import { USER } from '../content';
import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogListService } from '../../service/blog-list.service';

import { BLOG_ITEM } from '../content';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  currentUserId: boolean = false;
  blogItem: BLOG_ITEM | undefined;
  editing: boolean = false;
  paramId = this.route.snapshot.paramMap.get('id');

  constructor(
    private route: ActivatedRoute,
    private blogListService: BlogListService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBlogItem();
  }

  getBlogItem(): void {
    this.blogListService.getBlogItem(this.paramId).subscribe((item) => {
      this.handleUser(item.uid);
      this.blogItem = item;
    });
  }

  //check current user and blog item user
  handleUser(uid: string): void {
    const ls_currentUid = JSON.parse(localStorage.getItem(USER) || '').uid;
    if (uid === ls_currentUid) {
      this.currentUserId = true;
    }
  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }

  delete(blogItem: BLOG_ITEM | undefined) {
    if (blogItem !== undefined) {
      const OK = window.confirm('Are you sure want to delete this post?');
      if (OK) {
        this.blogListService.deleteBlogItem(blogItem._id).subscribe(() => {
          this.goToBack();
        });
      }
    }
  }

  goToBack(): void {
    this.location.back();
  }

  editingDone(event: any) {
    this.blogItem = event;
    this.editing = false;
  }
}
