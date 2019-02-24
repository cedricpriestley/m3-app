import { Component, OnInit, OnDestroy, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { map, filter, debounceTime, tap, switchAll } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
//import { SearchResult } from '../../models/search-result.model';
import { SearchService } from '../../../services/search.service';
//import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Output() loading = new EventEmitter<boolean>();
  @Output() artistResults = new EventEmitter<Object[]>();
  @Output() releaseResults = new EventEmitter<Object[]>();
  @ViewChild('searchBox') searchBox: ElementRef;
  @ViewChild('searchResults') searchResults: ElementRef;
  id: Number;
  searchInput = new FormControl('');

  constructor(
    private searchService: SearchService,
    private el: ElementRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    /*
        simulateBackspace: function(element) {
    
          var start = this.searchBox.nativeElement.selectionStart, end = this.searchBox.nativeElement.selectionEnd, event;
    
          if (!this.searchBox.nativeElement.setRangeText) { return; }
          if (start >= end) {
            if (start <= 0 || !this.searchBox.nativeElement.setSelectionRange) { return; }
            this.searchBox.nativeElement.setSelectionRange(start - 1, start);
          }
    
          this.searchBox.nativeElement.setRangeText("");
          event = document.createEvent("HTMLEvents");
          event.initEvent("input", true, false);
          this.searchBox.nativeElement.dispatchEvent(event);
        }
    */
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)).subscribe(
        event => {
          this.searchInput.setValue('');

          // for any element
          //this.searchBox.nativeElement.click();

          // for inputs and textareas
          this.searchBox.nativeElement.focus();
          //this.searchBox.nativeElement.select();
          //el.blur();
          //var textEvt = document.createEvent('TextEvent');

          //textEvt.initTextEvent('textinput', true, true, null, "New text", 1, "en-US");
          //this.el.nativeElement.dispatchEvent(textEvt); // fire the event on the the textarea
          //this.searchBox.nativeElement.focus();
          //this.searchBox.nativeElement.select();
          //this.searchBox.nativeElement.change();
          //this.searchBox.nativeElement.value = '';

          //var a = new KeyboardEvent("keypress", { key: "0", char: "!", shiftKey: true });
          //var a = new KeyboardEvent("keydown", { key: "1", shiftKey: true }); 
          //alert(a.type + " | " + a.key + " | " + a.char + " | " + a.shiftKey)
          //this.searchBox.nativeElement.dispatchEvent( a );
          // convert the `keyup` event into an observable stream
          fromEvent(this.el.nativeElement, 'keyup')
            .pipe(
              //takeUntil(this.unsubscribe),
              map((e: any) => e.target.value), // extract the value of the input

              filter(text => text.length >= 0), // filter out if empty
              debounceTime(1000), // only once every 500ms
              tap(() => this.loading.emit(true)), // enable loading
              map((query: string) => this.searchService.searchArtist(query)), // search, discarding old events if new input comes in

              switchAll() // produces values only from the most recent inner sequence ignoring previous streams.
            ).subscribe(  // act on the return of the search
              _results => {
                this.loading.emit(false);
                this.artistResults.emit(_results);
              },
              err => {
                console.log(err);
                this.loading.emit(false);
              },
              () => {
                this.loading.emit(false);
              }
            );

          // convert the `keyup` event into an observable stream
          fromEvent(this.el.nativeElement, 'keyup')
            .pipe(
              map((e: any) => e.target.value), // extract the value of the input

              filter(text => text.length >= 0), // filter out if empty
              debounceTime(1000), // only once every 500ms
              tap(() => this.loading.emit(true)), // enable loading
              map((query: string) => this.searchService.searchRelease(query)), // search, discarding old events if new input comes in

              switchAll() // produces values only from the most recent inner sequence ignoring previous streams.
            ).subscribe(  // act on the return of the search
              _results => {
                this.loading.emit(false);
                this.releaseResults.emit(_results);
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

  ngOnDestroy() { }
}