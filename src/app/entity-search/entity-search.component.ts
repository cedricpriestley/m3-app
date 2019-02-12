import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { EntityService } from '../entity.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entity-search',
  templateUrl: './entity-search.component.html',
  styleUrls: [ './entity-search.component.css' ]
})
export class EntitySearchComponent implements OnInit {
  entities$: Observable<Object[]>;
  private searchTerms = new Subject<string>();
  entityName: string;
  collections = ['area', 'artist'];
  constructor(
    private entityService: EntityService,
    private route: ActivatedRoute) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    let parts = window.location.pathname.toLowerCase().split("/");
    if (parts && parts.length == 1) {
      this.entityName = parts[0];
    }

    if (parts && parts.length >= 2) {
      this.entityName = parts[1];
    }

    if (!this.entityName
      || !this.collections.includes(this.entityName))
      this.entityName = 'artist';

    this.entities$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.entityService.searchEntities(term, this.entityName)),
    );
  }
}