import { KeywordsComponent } from './keywords/keywords.component';
import { NewPostComponent } from './new-post/new-post.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/signIn', pathMatch: 'full' },
  { path: 'home', component: BlogListComponent, canActivate:[AuthGuard] },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'detail/:id', component: BlogDetailComponent,canActivate:[AuthGuard] },
  { path: 'newPost', component: NewPostComponent,canActivate:[AuthGuard] },
  { path: 'keywords', component: KeywordsComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TypeaheadModule.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule {}
