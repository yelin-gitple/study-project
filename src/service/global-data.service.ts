import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  private dataSource = new BehaviorSubject(null);
  data = this.dataSource.asObservable;

  constructor() {}

  getUserData() {
    return this.dataSource.asObservable();
  }

  updatedDataSelection(data: any) {
    console.log(data)
    this.dataSource.next(data);
  }
}
