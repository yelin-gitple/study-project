import { FormBuilder, FormGroup } from '@angular/forms';
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
  editing: boolean = false;

  editForm = this.fb.group({
    newTitle: [''],
    newContent: [''],
  });

  constructor(
    private route: ActivatedRoute,
    private blogListService: BlogListService,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getBlogItem();
  }

  getBlogItem(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.blogListService.getBlogItem(id).subscribe((item) => {
      this.blogItem = item;
      this.editForm = this.fb.group({
        newTitle: [item.title],
        newContent: [item.body],
      });
    });
  }

  toggleEditing(): void {
    this.editing = !this.editing;
  }

  handleUpdate(e: MouseEvent) {
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

  delete(blogItem: BLOG_ITEM) {
    this.blogListService.deleteBlogItem(blogItem._id).subscribe(() => {
      this.goToBack();
    });
  }

  goToBack(): void {
    this.location.back();
  }
}
