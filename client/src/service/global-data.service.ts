import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  private dataSource = new BehaviorSubject(null);
  //data = this.dataSource.asObservable;

  constructor() {}

  getUserData() {
    //check logged in
    return this.dataSource.asObservable();
  }

  //check user info updated
  updatedDataSelection(data: any) {
    this.dataSource.next(data);
  }
}
