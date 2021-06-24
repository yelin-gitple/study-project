import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Location } from '@angular/common';
import { GlobalDataService } from 'src/service/global-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm = this.fb.group({
    userId: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: [''],
  });

  authMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private globalState: GlobalDataService
  ) {}

  ngOnInit(): void {}

  goSignIn(): void {
    this.router.navigateByUrl('/signIn');
  }

  onSubmit() {
    this.globalState.updatedDataSelection(null);
    this.authService.signUp(this.signUpForm.value).subscribe((result) => {
      if(result){
        alert(`Welcome ${result.firstName} ${result.lastName}`)
        this.goSignIn();
      }

      this.authMessage = this.authService.errorMessage;
    });
  }
}
