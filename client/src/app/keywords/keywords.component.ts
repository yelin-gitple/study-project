import { KEYWORD } from '../content';
import { Component, OnInit } from '@angular/core';
import { KeywordsService } from 'src/service/keywords.service';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.css'],
})
export class KeywordsComponent implements OnInit {
  keywords: KEYWORD = {
    keywordsList:[]
  };

  constructor(private keywordsService: KeywordsService) {}

  ngOnInit(): void {
    this.keywordsService.getKeywords().subscribe((result) => {
      this.keywords =result;
    });
  }
}
