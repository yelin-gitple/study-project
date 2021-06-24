import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalDataService } from 'src/service/global-data.service';
import { USER } from '../content';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Blog Study Project';
  loggedIn: boolean = false;

  constructor(private globalData: GlobalDataService, private router: Router) {}

  ngOnInit(): void {
    //console.log(this.username)
    // check user logged in
    this.globalData.getUserData().subscribe((result) => {
      if (result) {
        this.loggedIn = true;
      } else this.loggedIn = false;
    });

    // check localStorage
    let ls_user = JSON.parse(localStorage.getItem(USER) || '');
    if (ls_user) {
      this.loggedIn = true;
    } else this.loggedIn = false;
  }

  signOut() {
    this.globalData.updatedDataSelection(null);
    localStorage.setItem(USER, 'undefined');
    this.router.navigateByUrl('/signIn');

    alert('You just logged out! 👋');
  }
}
