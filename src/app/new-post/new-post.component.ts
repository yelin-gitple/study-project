import { USER, USER_ID_PW, BLOG_ITEM } from './../content';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BlogListService } from '../../service/blog-list.service';
import { Location } from '@angular/common';
import { GlobalDataService } from 'src/service/global-data.service';

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
    private location: Location,
    private globalData: GlobalDataService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem(USER) !== null) {
      this.ls_user = JSON.parse(localStorage.getItem(USER) || '');
    }
  }

  onSubmit() {
    // TO DO:
    //console.warn(this.newPostForm.value);
    console.log('on submit');
  }

  goBack(): void {
    this.location.back();
  }

  add() {
    const { title, body } = this.newPostForm.value;
    if (title === '' || body === '')
      alert('Please enter your post title and content!');

    if (title !== '' && body !== '') {
      const OK = window.confirm('Do you want add this post?');
      if (OK) {
        const newPostObj = {
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
}
