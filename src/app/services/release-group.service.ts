import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReleaseGroupService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getReleaseGroups(id: string, offset: number, itemsPerPage: number, releaseType: string): Observable<Object[]> {
    let url = `https://musicbrainz.org/ws/2/release-group?artist=${id}&offset=${offset}&limit=${itemsPerPage}&type=${releaseType}&fmt=json`;
    this.log(url);
    let ret = this.http.get<Object[]>(url).pipe(
      //map(res => res['release-groups']),
      catchError(this.handleError<Object[]>('getReleaseGroups', []))
    );
    return ret;
  }

  getReleaseGroup(mbid: string): Observable<Object> {
    //const url = `${this.artistsUrl}/${mbid}`;
    const url = `https://musicbrainz.org/ws/2/release-group/${mbid}?inc=artists+releases+aliases+tags+area-rels+artist-rels+event-rels+instrument-rels+label-rels+place-rels+recording-rels+release-rels+release-group-rels+series-rels+url-rels+work-rels&fmt=json`;
    this.log(url);
    return this.http.get<Object>(url).pipe(
      //tap(_ => this.log(`fetched release group id=${mbid}`)),
      catchError(this.handleError<Object>(`getReleaseGroup id=${mbid}`))
    );
  }

  /** Log a ArtistService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ReleaseGroupService: ${message}`);
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