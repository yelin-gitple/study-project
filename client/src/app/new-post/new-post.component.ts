import { USER, BLOG_ITEM } from '../content';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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

  constructor(private fb: FormBuilder, private location: Location) {}

  ngOnInit(): void {
    const ls_user = localStorage.getItem(USER);

    if (ls_user !== null) {
      this.ls_user = JSON.parse(ls_user || '');
    }
  }

  goBack(): void {
    this.location.back();
  }
}
