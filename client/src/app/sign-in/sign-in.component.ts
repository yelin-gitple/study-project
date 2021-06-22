import { MessageService } from '../../service/message.service';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalDataService } from 'src/service/global-data.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  signInForm = this.fb.group({
    userId: ['gitple', Validators.required],
    password: ['gitple', Validators.required],
  });

  authMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private location: Location,
    private globalData: GlobalDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  onSubmit() {
    const { userId, password } = this.signInForm.value;
    this.authService.signIn(userId, password).subscribe((result) => {
      this.globalData.updatedDataSelection(result);
      localStorage.setItem('LoggedIn', 'true');
      localStorage.setItem('USER', JSON.stringify(result));

      if (result) this.goToHome();
      //alert('You just logged in! 🤗');

      this.authMessage = this.authService.errorMessage;
    });
  }
}
