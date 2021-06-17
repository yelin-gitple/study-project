import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm = this.fb.group({
    userId: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  goToHome() {
    this.location.go('/home');
  }

  onSubmit() {
    const { userId, password } = this.signInForm.value;
    this.authService.signIn(userId, password).subscribe((result) => {
      console.log(result);
      if (result) this.goToHome();
    });
  }
}


