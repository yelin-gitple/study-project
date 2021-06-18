import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm = this.fb.group({
    userId: ['gitple', Validators.required],
    password: ['gitple', Validators.required],
    firstName: ['gitple', Validators.required],
    lastName: ['gitple'],
    // address: this.fb.group({
    //   street: [''],
    //   city: [''],
    //   state: [''],
    //   zip: [''],
    // }),
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  goSignIn(): void {
    this.location.go('/signIn');
  }

  onSubmit() {
    this.authService
      .signUp(this.signUpForm.value)
      .subscribe(() => this.goSignIn());
  }
}
