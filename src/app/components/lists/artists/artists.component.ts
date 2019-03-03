import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
import { EntityService } from '../../../services/entity.service';
import { ArtistService } from '../../../services/artist.service';
// import { Artist, Query } from '../../../types';
import { Apollo } from 'apollo-angular';
import * as Query from '../../../global-query';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  entityName = 'Artist';
  entities: {}[];
  artists: Array<any> = [];

  p = 1;
  totalItems = 0;
  itemsPerPage = 50;
  loading = false;
  totalEntities = 0;

  constructor(
    private entityService: EntityService,
    private artistService: ArtistService,
    private apollo: Apollo
  ) {
  }

  ngOnInit2() {
  }

  ngOnInit() {

    this.getCount();
    // this.getTop();
    this.getPage(1);
  }

  /**
   * ----------------------------------------------------
   * Get All Artists
   * ----------------------------------------------------
   * @method getPage
   */
  getPage(page: number): void {
    const offset = page * (this.itemsPerPage) - this.itemsPerPage;
    this.apollo.watchQuery({
      query: Query.getArtists,
      variables: {
        limit: this.itemsPerPage,
        offset
      }
    })
      .valueChanges
      .pipe(
        map((result: any) => result.data.getArtists)
      ).subscribe((data) => {
        this.artists = data;
      });
  }


  getPage2(page: number): void {
    this.loading = true;
    const offset = page * (this.itemsPerPage) - this.itemsPerPage;
    this.entityService.browseEntities(this.entityName, offset, this.itemsPerPage)
      .subscribe(
        ret => {
          this.totalItems = this.totalEntities;
          this.entities = ret;
          this.p = page;
        }
      );
  }

  getCount(): void {
    this.entityService.getEntityCount(this.entityName)
      .subscribe(
        ret => {
          this.totalEntities = ret[0].count;
        }
      );
  }
}