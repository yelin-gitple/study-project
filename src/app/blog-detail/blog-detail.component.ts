import { USER } from './../content';
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
  currentUserId: string = '';
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
  }

  getBlogItem(): void {
    this.blogListService.getBlogItem(this.paramId).subscribe((item) => {
      this.handleUser(item);
      this.blogItem = item;

      this.editForm = this.fb.group({
        newTitle: [item.title],
        newContent: [item.body],
      });
    });
  }

  handleUser(blogInfo: any): void {
    this.authService
      .getCurrentUser(JSON.parse(localStorage.getItem(USER) || '').token)
      .subscribe((result) => {
        console.log(result)
        //console.log(result, blogInfo);
      });
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
      this.blogListService.updateBlogItem(this.blogItem).subscribe();
    }
  }

  delete(blogItem: BLOG_ITEM | undefined) {
    if (blogItem !== undefined) {
      this.blogListService.deleteBlogItem(blogItem._id).subscribe(() => {
        this.goToBack();
      });
    }
  }

  goToBack(): void {
    this.location.back();
  }
}
