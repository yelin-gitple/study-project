import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Location } from '@angular/common';
import { GlobalDataService } from 'src/service/global-data.service';

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
  });

  authMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private location: Location,
    private globalState: GlobalDataService
  ) {}

  ngOnInit(): void {}

  goSignIn(): void {
    this.location.go('/signIn');
  }

  onSubmit() {
    this.globalState.updatedDataSelection(null);
    this.authService.signUp(this.signUpForm.value).subscribe(() => {
      this.goSignIn();
      console.log(this.authService.errorMessage)
      this.authMessage = this.authService.errorMessage;
      console.log(this.authMessage)
    });
  }
}
