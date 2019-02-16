import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
//import { SearchResult } from '../models/search-result.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(query: string, type: string): Observable<Object[]> {
    if (!query) return of([]);

    const queryUrl = `https://musicbrainz.org/ws/2/${type}?limit=50&offset=0&fmt=json&query=${query}`;
    return this.http.get(queryUrl).pipe(map(response => {
      return response[`${type}s`].map(entity => {
        entity['_entity_type'] = type;
        return entity;
      });
    }));
  }
}
