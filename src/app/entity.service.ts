import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  private entityUrl = 'http://localhost:8000/api';  // URL to web api
  private ret = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getEntity(id: string, type: string): Observable<Object> {
    const url = `${this.entityUrl}/${type}/${id}`;
    this.log(type, url);
    return this.http.get<Object>(url).pipe(
      //tap(_ => this.log(`fetched ${type} id=${id}`)),
      catchError(this.handleError<Object>(type, `getEntity id=${id}`))
    );
  }

  getEntityCount(type: string) {
    let entityName = type.toLowerCase();
    const url = `${this.entityUrl}/${entityName}/count`;
    this.log(type, url);
    return this.http.get<number>(url).pipe(
      catchError(this.handleError<Object[]>(type, 'getEntityCount', []))
    );
  }

  searchEntities(term: string, type: string): Observable<Object[]> {
    if (!term.trim()) {
      // if not search term, return empty entity array.
      return of([]);
    }
    
    let url = `https://musicbrainz.org/ws/2/${type}?limit=30&offset=0&fmt=json&query=${term}`
    let mapType = `${type}s`;

    if (mapType == 'seriess') mapType = 'series';
    
    this.log(type, url);

    return this.http.get<Object[]>(url).pipe(
      map(res => res[`${type}s`]),
      //tap(_ => this.log(`found ${type} matching "${term}"`)),
      catchError(this.handleError<Object[]>(type, 'searchEntities', []))
    );
  }
/*
  searchArtists2(term: string, offset: number, count: number): Observable<Object[]> {
    let url = `${this.entityUrl}/artist/search/${term}/${offset}/${count}`;
    this.log(url);
    let ret = this.http.get<Object[]>(url).pipe(
      catchError(this.handleError<Object[]>('searchArtists2', []))
    );
    return ret;
  }
*/
  browseEntities(type: string, offset: number, count: number): Observable<Object[]> {
    let entityName = type.toLowerCase();    
    let url = `${this.entityUrl}/${type}/browse/${entityName}/${count}`;
    this.log(type, url);
    let ret = this.http.get<Object[]>(url).pipe(
      catchError(this.handleError<Object[]>(type, 'browseEntities', []))
    );
    return ret;
  }
/*
  importArtist(id: string): Observable<Object> {
    const url = `${this.entityUrl}/import/${id}`;
    this.log(url);
    return this.http.get<Object>(url).pipe();
  }

  resetArtist(id: string): Observable<Object> {
    const url = `${this.entityUrl}/reset/${id}`;
    this.log(url);
    return this.http.get<Object>(url).pipe();
  }
*/
  /** Log a ArtistService message with the MessageService */
  private log(type: string, message: string) {
    //return;
    this.messageService.add(`EntityService (): ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(type, operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(type, `${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}