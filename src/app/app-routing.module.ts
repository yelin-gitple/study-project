import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: BlogListComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'detail/:id', component: BlogDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TypeaheadModule.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule {}
