import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityService } from '../../../services/entity.service';
import { ReleaseService } from '../../../services/release.service';
import { Apollo } from 'apollo-angular';
import * as Query from '../../../global-query';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {

  entityName = 'Release';
  entities: {}[];
  releases: Array<any> = [];

  p = 1;
  totalItems = 0;
  itemsPerPage = 50;
  loading = false;
  totalEntities = 0;

  constructor(
    private entityService: EntityService,
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
   * Get All Releases
   * ----------------------------------------------------
   * @method getPage
   */
  getPage(page: number): void {
    const offset = page * (this.itemsPerPage) - this.itemsPerPage;
    this.apollo.watchQuery({
      query: Query.getReleases,
      variables: {
        limit: this.itemsPerPage,
        offset
      }
    })
      .valueChanges
      .pipe(
        map((result: any) => result.data.getReleases)
      ).subscribe((data) => {
        this.releases = data;
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