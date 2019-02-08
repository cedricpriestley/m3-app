import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { ARTISTS } from '../data/top-artists';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
//import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root',
})
export class ArtistService {

  private artistsUrl = 'http://localhost:8000/api/artist';  // URL to web api
  private ret = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET artists from the server */
  getArtists(name: string): Observable<Object[]> {
    name = 'Michael Jackson';
    this.artistsUrl = "https://musicbrainz.org/ws/2/artist?limit=30&offset=0&fmt=json";
    //this.artistsUrl = "http://localhost/artist-search.json";

    this.ret = this.http.get<Object[]>(this.artistsUrl).pipe(
      //catchError(this.handleError('getArtists', [])),
      map(res => res['artists'])
    )

    //console.log(this.ret);

    return this.ret;
  }

  getTopArtists(): Observable<Object[]> {
    // TODO: send the message _after_ fetching the artists
    this.messageService.add('ArtistService: fetched top artists');
    //console.log(ARTISTS);
    return of(ARTISTS);
  }

  //getArtist(id: number): Observable<Artist> {
  // TODO: send the message _after_ fetching the artist
  //this.messageService.add(`ArtistService: fetched artist id=${id}`);
  //return of(ARTISTS.find(artist => artist.id === id));
  //}

  /** GET artist by id. Will 404 if id not found */
  getArtist(id: number): Observable<Object> {
    const url = `${this.artistsUrl}/${id}`;
    this.log(url);
//aliases+tags+area-rels+artist-rels+event-rels+instrument-rels+label-rels+place-rels+recording-rels+release-rels+release-group-rels+series-rels+url-rels+work-rels
    return this.http.get<Object>(url).pipe(
      //tap(_ => this.log(`fetched artist id=${mbid}`)),
      //catchError(this.handleError<Artist>(`getArtist id=${mbid}`))
    );
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

  /* GET artists whose name contains search term */
  searchArtists(term: string): Observable<Object[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    //this.log(`${this.artistsUrl}&query=${term}`);
    this.log(`https://musicbrainz.org/ws/2/artist?limit=30&offset=0&fmt=json&query=${term}`);
    return this.http.get<Object[]>(`https://musicbrainz.org/ws/2/artist?limit=30&offset=0&fmt=json&query=${term}`).pipe(
      map(res => res['artists']),
      tap(_ => this.log(`found artists matching "${term}"`)),
      //catchError(this.handleError<Artist[]>('searchArtists', []))
    );
  }
}