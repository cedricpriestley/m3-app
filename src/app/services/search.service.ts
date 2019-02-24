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

  searchArtist(query: string): Observable<{}[]> {
    if (!query) return of([]);

    let queryUrl = '';
    //let ret = [];//new Observable<{}[]>();

    queryUrl = `https://musicbrainz.org/ws/2/artist?limit=10&offset=0&fmt=json&query=${query}`;
    return this.http.get(queryUrl).pipe(map(response => {
      return response['artists'].map(entity => {
        entity['_entity_type'] = 'artist';
        return entity;
      });
    }));
    /*
        queryUrl = `https://musicbrainz.org/ws/2/release?limit=10&offset=0&fmt=json&query=${query}`;
        ret['releases'] = this.http.get<Object[]>(queryUrl).pipe(map(response => {
          return response['releases'].map(entity => {
            entity['_entity_type'] = 'release';
            return entity;
          });
        }));
    */
    //console.log(ret['artists']);

    //return ret;
  }


  searchRelease(query: string): Observable<{}[]> {
    if (!query.trim()) return of([]);

    let queryUrl = '';
    //let ret = [];//new Observable<{}[]>();

    queryUrl = `https://musicbrainz.org/ws/2/release?limit=10&offset=0&fmt=json&query=${query}`;
    return this.http.get(queryUrl).pipe(
      map(response => {
        return response['releases'].map(entity => {
          entity['_entity_type'] = 'release';
          return entity;
        });
      }),
      //catchError(this.handleError<Hero[]>('searchHeroes', [])),
    );
  }
}