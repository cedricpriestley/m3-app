import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { ARTISTS } from '../data/top-artists';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private artistsUrl = 'http://localhost:8000/api/artist';  // URL to web api
  private ret = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getTopArtists(): Observable<Object[]> {
    // TODO: send the message _after_ fetching the artists
    this.messageService.add('ArtistService: fetched top artists');
    return of(ARTISTS);
  }

  getArtist(id: string): Observable<Object> {
    const url = `${this.artistsUrl}/${id}`;
    this.log(url);
    return this.http.get<Object>(url).pipe(
      //tap(_ => this.log(`fetched artist id=${mbid}`)),
      //catchError(this.handleError<Artist>(`getArtist id=${mbid}`))
    );
  }

  getArtistCount() {
    const url = `${this.artistsUrl}/count`;
    this.log(url);
    return this.http.get<number>(url).pipe(
      //catchError(this.handleError<Artist[]>('searchArtists', []))
    );
  }

  searchArtists(term: string): Observable<Object[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }

    let url = `https://musicbrainz.org/ws/2/artist?limit=30&offset=0&fmt=json&query=${term}`
    this.log(url);

    return this.http.get<Object[]>(url).pipe(
      map(res => res['artists']),
      tap(_ => this.log(`found artists matching "${term}"`)),
      //catchError(this.handleError<Artist[]>('searchArtists', []))
    );
  }

  searchArtists2(term: string, offset: number, count: number): Observable<Object[]> {
    let url = `${this.artistsUrl}/artist/search/${term}/${offset}/${count}`;
    this.log(url);
    let ret = this.http.get<Object[]>(url).pipe(
      catchError(this.handleError<Object[]>('searchArtists2', []))
    );
    return ret;
  }

  browseArtists(offset: number, count: number): Observable<Object[]> {
    let url = `${this.artistsUrl}/browse/${offset}/${count}`;
    this.log(url);
    let ret = this.http.get<Object[]>(url).pipe(
      catchError(this.handleError<Object[]>('browseArtists', []))
    );
    return ret;
  }

  importArtist(id: string): Observable<Object> {
    const url = `${this.artistsUrl}/import/${id}`;
    this.log(url);
    return this.http.get<Object>(url).pipe();
  }

  resetArtist(id: string): Observable<Object> {
    const url = `${this.artistsUrl}/reset/${id}`;
    this.log(url);
    return this.http.get<Object>(url).pipe();
  }

  /** Log a ArtistService message with the MessageService */
  private log(message: string) {
    //return;
    this.messageService.add(`ArtistService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}