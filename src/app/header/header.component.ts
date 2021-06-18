import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalDataService } from 'src/service/global-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Blog Study Project';
  loggedIn: boolean = false;

  constructor(
    private globalData: GlobalDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // check user logged in
    this.globalData.getUserData().subscribe((result) => {
      if (result) this.loggedIn = true;
      else this.loggedIn = false;
    });

    // check localStorage
    let ls_loggedIn = localStorage.getItem('LoggedIn');
    if (ls_loggedIn === 'true') this.loggedIn = true;
    else this.loggedIn = false;

    console.log('logged in', this.loggedIn);
  }

  signOut() {
    this.globalData.updatedDataSelection(null);
    localStorage.setItem('LoggedIn', 'false');
    alert('You just logged out! 👋');
    this.router.navigateByUrl('/signIn');
  }
}
