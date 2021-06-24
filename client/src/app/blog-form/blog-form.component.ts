import { Router } from '@angular/router';
import { BlogListService } from './../../service/blog-list.service';
import { FormBuilder } from '@angular/forms';
import { BLOG_ITEM } from './../content';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css'],
})
export class BlogFormComponent implements OnInit {
  @Input() editing!: boolean;
  @Input() blogItem: BLOG_ITEM | undefined;

  @Output() editingChange = new EventEmitter<boolean>();

  currentLocation!: string;
  editForm = this.fb.group({
    newTitle: [''],
    newContent: [''],
  });

  constructor(
    private fb: FormBuilder,
    private blogListService: BlogListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentLocation = this.router.url;
  }

  ngOnChanges() {
    this.editForm = this.fb.group({
      newTitle: [this.blogItem?.title],
      newContent: [this.blogItem?.body],
    });
  }

  handleUpdate(e: Event) {
    this.editingChange.emit(false);

    e.preventDefault();

    if (this.blogItem) {
      this.blogItem = {
        ...this.blogItem,
        title: this.editForm.value.newTitle,
        body: this.editForm.value.newContent,
      };

      const OK = window.confirm('Are you sure want to update this post?');
      if (OK) {
        this.blogListService
          .updateBlogItem(this.blogItem)
          .subscribe((result) => {
            console.log(result);
          });
        this.editing = false;
      }
    }
  }
}
