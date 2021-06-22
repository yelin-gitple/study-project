//import { GlobalState } from './../service/global-state.service';
import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { GlobalDataService } from 'src/service/global-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'blog-study-project';
  userState: boolean = false;

  constructor(private globalData: GlobalDataService) {
    setTheme('bs3');
  }

  ngOnInit() {
    this.globalData.getUserData().subscribe((user) => {
      if (user) this.userState = true;
    });
  }
}