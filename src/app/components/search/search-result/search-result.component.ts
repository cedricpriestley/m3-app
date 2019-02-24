import { Component, OnInit, Input } from '@angular/core';
//import { SearchResult } from '../../models/search-result.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input() result: Object;

  constructor() { }

  ngOnInit() {
  }

  hideSearchResults() {
    const searchResults = Array.from(document.getElementsByClassName('searchResult'));
    for (const searchResult of searchResults) {
      searchResult.remove();

      const artistSearchResultsHeader = document.getElementById('artistSearchResultsHeader');
      if (artistSearchResultsHeader) {
        artistSearchResultsHeader.textContent = '';
      }

      const releaseSearchResultsHeader = document.getElementById('releaseSearchResultsHeader');
      if (releaseSearchResultsHeader) {
        releaseSearchResultsHeader.textContent = '';
      }
    }
  }
}