import { USER } from '../content';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogListService } from '../../service/blog-list.service';
import { AuthService } from 'src/service/auth.service';

import { BLOG_ITEM } from '../content';
import { GlobalDataService } from 'src/service/global-data.service';
import { identity } from 'lodash';

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

  editForm = this.fb.group({
    newTitle: [''],
    newContent: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private blogListService: BlogListService,
    private authService: AuthService,
    private location: Location,
    private fb: FormBuilder,
    private globalState: GlobalDataService
  ) {}

  ngOnInit(): void {
    this.getBlogItem();

    this.authService.getCurrentUser(
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MGNhZTYyMTNmYmEyMzU4OTdlZWUwNTIiLCJ1c2VySWQiOiJnaXRwbGUiLCJuYW1lIjoiZ2l0cGxlIGdpdHBsZSIsImlhdCI6MTYyNDM1MDQxNiwiZXhwIjoxNjI0MzU0MDE2fQ.HkR9hOKCjK6Z8B7Wtv3RuCP8dP158SVdbYpjwC-h9R0'
    ).subscribe(result => console.log(result));
  }

  getBlogItem(): void {
    this.blogListService.getBlogItem(this.paramId).subscribe((item) => {
      this.handleUser(item.uid);
      this.blogItem = item;

      this.editForm = this.fb.group({
        newTitle: [item.title],
        newContent: [item.body],
      });
    });
  }

  handleUser(uid: string): void {
    const ls_currentUid = JSON.parse(localStorage.getItem(USER) || '').uid;
    if (uid === ls_currentUid) {
      this.currentUserId = true;
    }
  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }

  handleUpdate(e: Event) {
    e.preventDefault();
    this.editing = false;
    if (this.blogItem) {
      this.blogItem = {
        ...this.blogItem,
        title: this.editForm.value.newTitle,
        body: this.editForm.value.newContent,
      };

      const OK = window.confirm('Are you sure want to update this post?');
      if (OK) {
        this.blogListService.updateBlogItem(this.blogItem).subscribe();
      }
    }
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
}
