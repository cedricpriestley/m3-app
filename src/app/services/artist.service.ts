import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { ARTISTS } from '../../data/top-artists';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private artistsUrl = 'http://localhost:8000/api/artist';  // URL to web api
  private ret = null;

  lookupMutation = gql`
  query getArtist($mbid: String!) {
    getArtist(mbid: $mbid) {
      _id
      mbid
      name
      sortName
      disambiguation
      country
      type
      typeID
      rating {
        voteCount
        value
      }
      gender
      genderID
      lifeSpan {
        begin
        end
        ended
      }
      area {
        mbid
        name
        sortName
        disambiguation
      }
      beginArea {
        mbid
        name
        sortName
        disambiguation
      }
      endArea {
        mbid
        name
        sortName
        disambiguation
      }
      relationships {
        artists {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
        events {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
        instruments {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
        labels {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
        places {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
        recordings {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              title
            }
            attributes
          }
        }
        releases {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              title
            }
            attributes
          }
        }
        releaseGroups {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              title
            }
            attributes
          }
        }
        works {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              title
            }
            attributes
          }
        }
        urls {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              resource
            }
            attributes
          }
        }
        series {
          nodes {
            type
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
      }
      aliases {
        name
        type
      }
      tags {
        tags {
          name
          count
        }
      }
      lastFM {
        image
        similarArtists {
          similarArtists {
            mbid
            name
            image
          }
        }
        url
        tags {
          tags {
            name
            url
          }
        }
        biography {
          summaryHTML
        }
      }
    }
  }`;

  saveMutation = gql`
  mutation saveArtist($entity: String!) {
    saveArtist(data: $entity) {
      _id
      mbid
      name
      sortName
      disambiguation
      country
      type
      typeID
      rating {
        voteCount
        value
      }
      gender
      genderID
      lifeSpan {
        begin
        end
        ended
      }
      area {
        mbid
        name
        sortName
        disambiguation
      }
      beginArea {
        mbid
        name
        sortName
        disambiguation
      }
      endArea {
        mbid
        name
        sortName
        disambiguation
      }
      relationships {
        artists {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
        events {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
        instruments {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
        labels {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
        places {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
        recordings {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              title
            }
            attributes
          }
        }
        releases {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              title
            }
            attributes
          }
        }
        releaseGroups {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
        works {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
        urls {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
        series {
          nodes {
            type
            targetType
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              mbid
              name
            }
            attributes
          }
        }
      }
      aliases {
        name
        type
      }
      tags {
        tags {
          name
          count
        }
      }
      lastFM {
        smallImage
        mediumImage
        largeImage
        extraLargeImage
        megaImage
        similarArtists {
          similarArtists {
            mbid
            name
            image
          }
        }
        url
        tags {
          tags {
            name
            url
          }
        }
        biography {
          summaryHTML
        }
      }
    }
  }`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private apollo: Apollo) { }

  lookupArtist(mbid) {
    return this.apollo.use("mutations").mutate({
      mutation: this.lookupMutation,
      variables: {
        mbid: mbid
      }
    });
  }

  saveArtist(entity) {
    return this.apollo.use("mutations").mutate({
      mutation: this.saveMutation,
      variables: {
        entity: entity
      }
    });
  }

  getTopArtists(): Observable<{}[]> {
    return of(ARTISTS);
    this.messageService.add('ArtistService: fetched top artists');
    const url = `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=e1182eaac16ae88fec850af3a0e7ab19&format=json`

    this.log(url);

    return this.http.get<Object[]>(url).pipe(
      map(res => res['artists']['artist']),
      catchError(this.handleError<{}[]>('getTopArtists', []))
    );
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