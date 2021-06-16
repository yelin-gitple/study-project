import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BlogListService } from '../blog-list.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  newPostForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private blogListService: BlogListService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    // TO DO:
    //console.warn(this.newPostForm.value);
  }

  goBack(): void {
    this.location.back();
  }

  add() {
    this.blogListService
      .addPost(this.newPostForm.value)
      .subscribe(() => this.goBack());
  }
}
