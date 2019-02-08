import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-search',
  templateUrl: './artist-search.component.html',
  //styleUrls: [ './artist-search.component.css' ]
})
export class ArtistSearchComponent implements OnInit {
  artists$: Observable<Object[]>;
  private searchTerms = new Subject<string>();

  constructor(private artistService: ArtistService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.artists$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.artistService.searchArtists(term)),
    );
  }
}