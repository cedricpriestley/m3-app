import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { EntityService } from '../entity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Input } from '@angular/compiler/src/core';

@Component({
  selector: 'app-entity-search',
  templateUrl: './entity-search.component.html',
  styleUrls: ['./entity-search.component.css']
})
export class EntitySearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBox') searchBox: ElementRef;

  entities$: Observable<Object[]>;
  private searchTerms = new Subject<string>();
  entityName: string;

  constructor(
    private entityService: EntityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)).subscribe(
        data => {
          //console.log(this.searchBox.nativeElement.value);
          this.searchBox.nativeElement.value = '';

          let term = this.entityService.getEntityType();
          this.entities$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.entityService.searchEntities(term)),
          );
        });
  }

  ngAfterViewInit() {
//    console.log(this.searchBox);
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
