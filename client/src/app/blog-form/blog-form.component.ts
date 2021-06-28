import { Router } from '@angular/router';
import { BlogListService } from './../../service/blog-list.service';
import { FormBuilder } from '@angular/forms';
import { BLOG_ITEM, USER } from './../content';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Console } from 'console';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'],
})
export class BlogFormComponent implements OnInit {
  @Input() editing!: boolean;
  @Input() blogItem: BLOG_ITEM | undefined;

  @Output() editingChange = new EventEmitter<BLOG_ITEM>();

  currentLocation!: string;
  editForm = this.fb.group({
    newTitle: ['WELCOME TITLE'],
    newContent: ['WELCOME CONTENT'],
  });

  ls_user: BLOG_ITEM = {
    title: '',
    body: '',
    createdAt: Date.now(),
    username: '',
    userId: '',
    uid: '',
  };

  constructor(
    private fb: FormBuilder,
    private blogListService: BlogListService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const ls_user = localStorage.getItem(USER);
    this.currentLocation = this.router.url;

    if (ls_user !== null) {
      this.ls_user = JSON.parse(ls_user || '');
    }
  }

  ngOnChanges() {
    this.editForm = this.fb.group({
      newTitle: [this.blogItem?.title],
      newContent: [this.blogItem?.body],
    });
  }

  goBack(): void {
    this.location.back();
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    // console.log(
    //   '🚀 ~ file: blog-form.component.ts ~ line 70 ~ BlogFormComponent ~ handleSubmit ~ this.blogItem',
    //   this.blogItem
    // );
    const OK = window.confirm(
      `Are you sure want to ${
        this.currentLocation === '/newPost' ? 'register' : 'update'
      } this post?`
    );

    if (this.blogItem) {
      this.blogItem = {
        ...this.blogItem,
        title: this.editForm.value.newTitle,
        body: this.editForm.value.newContent,
      };

      if (OK && this.currentLocation.includes('detail')) {
        this.blogListService
          .updateBlogItem(this.blogItem)
          .subscribe((result: any) => {
            // console.log(this.blogItem);
            // console.log(
            //   '🚀 ~ file: blog-form.component.ts ~ line 61 ~ BlogFormComponent ~ .subscribe ~ result',
            //   result
            // );
            this.editingChange.emit(this.blogItem);
          });
        this.editing = false;
      }
    }

    if (OK && this.currentLocation === '/newPost') {
      const newPostObj: BLOG_ITEM = {
        ...this.editForm.value,
        createdAt: Date.now(),
        username: this.ls_user.username,
        userId: this.ls_user.userId,
        uid: this.ls_user.uid,
      };

      this.blogListService.addPost(newPostObj).subscribe((result) => {
        console.log(
          '🚀 ~ file: blog-form.component.ts ~ line 113 ~ BlogFormComponent ~ this.blogListService.addPost ~ result',
          result
        );

        this.goBack();
      });
    }
  }
}
