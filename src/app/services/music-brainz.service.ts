import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicBrainzService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  lookup(mbid, type): Observable<Object[]> {
    if (!mbid) {
      return of([]);
    }

    var includes = this.getEntityIncludes(type).join("+");
    var url = `https://musicbrainz.org/ws/2/${type}/${mbid}?inc=${includes}&fmt=json`;

    this.log(type, url);

    return this.http.get<Object[]>(url).pipe(
      //map(res => res[`${type}`]),
      //tap(_ => this.log(`found ${type} matching "${term}"`)),
      catchError(this.handleError<Object[]>('lookup', [type, mbid], []))
    );
  }

  search(term, type): Observable<Object[]> {

    if (!term.trim()) {
      // if not search term, return empty entity array.
      return of([]);
    }

    let url = `https://musicbrainz.org/ws/2/${type}?limit=30&offset=0&fmt=json&query=${term}`

    this.log(type, url);

    return this.http.get<Object[]>(url).pipe(
      map(res => res[`${type}s`]),
      //tap(_ => this.log(`found ${type} matching "${term}"`)),
      catchError(this.handleError<Object[]>('searchEntities', [term, type], []))
    );
  }

  /** Log a EntityService message with the MessageService */
  private log(params: [string, string], message: string) {
    //return;
    this.messageService.add(`MusicBrainzService: ${message}`);
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', params, result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(params, `${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /*
"area-rels", "artist-rels", "event-rels",
"label-rels", "place-rels", "recording-rels", "release-group-rels",
"release-rels", "series-rels", "url-rels", "work-rels"
*/
  getEntityIncludes = type => {
    switch (type) {
      case "area":
        return ["aliases", "ratings", "tags"];
      case "artist":
      case "label":
      case "work":
        return ["aliases", "ratings", "tags"];
      case "event":
      case "place":
      case "recording":
      case "release":
        return ["artist-credits", "ratings", "tags"];
      case "release-group":
        return ["artist-credits", "ratings", "tags"];
      case "series":
      case "url":
        return ["ratings", "tags"];
      default:
        break;
    }
  }
}
