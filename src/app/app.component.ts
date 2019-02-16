import { Component } from '@angular/core';
import { Location } from '@angular/common';
//import { SearchResult } from '../models/search-result.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'm3-app';
  results: Object[];
  loading: boolean;
  message = '';

  constructor(
    private location: Location
  ) { }

  updateResults(results: Object[]): void {
    this.results = results;
    if (this.results.length === 0) {
      //this.message = 'Not found...';
    } else {
      //this.message = 'Top 10 results:';
    }
  }

  goBack(): void {
    this.location.back();
  }
}
