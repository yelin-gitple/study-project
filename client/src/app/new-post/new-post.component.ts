import { USER, USER_ID_PW, BLOG_ITEM } from '../content';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BlogListService } from '../../service/blog-list.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  newPostForm = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
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
    private location: Location
  ) {}

  ngOnInit(): void {
    const ls_user = localStorage.getItem(USER);

    if (ls_user !== null) {
      this.ls_user = JSON.parse(ls_user || '');
    }
  }

  onSubmit() {
    const { title, body } = this.newPostForm.value;
    if (title === '' || body === '')
      alert('Please enter your post title and content!');

    if (title !== '' && body !== '') {
      const OK = window.confirm('Do you want to add this post?');
      if (OK) {
        //type 지정하기
        const newPostObj:BLOG_ITEM = {
          ...this.newPostForm.value,
          createdAt: Date.now(),
          username: this.ls_user.username,
          userId: this.ls_user.userId,
          uid: this.ls_user.uid,
        };

        this.blogListService.addPost(newPostObj).subscribe(() => this.goBack());
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
