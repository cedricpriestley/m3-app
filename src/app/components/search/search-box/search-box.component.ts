import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
//import { SearchResult } from '../../models/search-result.model';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() loading = new EventEmitter<boolean>();
  @Output() results = new EventEmitter<Object[]>();
  type: string;
  term: string;
  searchInput = new FormControl('');
  searchOption = new FormControl('');

  searchResults: Observable<any>;

  constructor(
    private searchService: SearchService,
    private el: ElementRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchOption.setValue('artist');

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)).subscribe(
        data => {
          this.searchInput.setValue('');
          // convert the `keyup` event into an observable stream
          fromEvent(this.el.nativeElement, 'keyup')
          .pipe(
            map((e: any) => e.target.value), // extract the value of the input

            filter(text => text.length >= 0), // filter out if empty
            debounceTime(500), // only once every 500ms
            tap(() => this.loading.emit(true)), // enable loading
            map((query: string) => this.searchService.search(query, this.searchOption.value)), // search, discarding old events if new input comes in

            switchAll()) // produces values only from the most recent inner sequence ignoring previous streams.
            .subscribe(  // act on the return of the search
              _results => {
                this.loading.emit(false);
                this.results.emit(_results);
              },
              err => {
                console.log(err);
                this.loading.emit(false);
              },
              () => {
                this.loading.emit(false);
              }
            );
        });
  }
}
