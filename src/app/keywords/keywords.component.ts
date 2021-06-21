import { Component, OnInit } from '@angular/core';
import { KeywordsService } from 'src/service/keywords.service';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css'],
})
export class KeywordsComponent implements OnInit {
  constructor(private keywordsService: KeywordsService) {}

  ngOnInit(): void {
    console.log(this.keywordsService.getKeywords())
    this.keywordsService.getKeywords().subscribe(result => {
      console.log(result)
    });
  }
}
