import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityService } from '../../../services/entity.service';
import { AreaService } from '../../../services/area.service';
import { Area, Query } from '../../../types';
import gql from 'graphql-tag';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent {

  entityName = 'Area';
  entities: Object[];

  p: number = 1;
  totalItems: number;
  itemsPerPage: number = 50;
  loading: boolean;
  totalEntities: number = 0;

  constructor(
    private entityService: EntityService,
    private areaService: AreaService,
    private areas: Observable<Area[]>,
    private apollo: Apollo
  ) {
  }

  ngOnInit() {
    this.areas = this.apollo.watchQuery<Query>({
      query: gql`
        query allAreas {
            allAreas {
            mbid
            name
            type
            lastUpdated
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map(result => result.data.allAreas)
      );
  }

  ngOnInit2() {
    //this.getCount();
    //this.getTop();
    //this.getPage(1);
  }

  getPage(page: number): void {
    this.loading = true;
    let offset = page * (this.itemsPerPage) - this.itemsPerPage;
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
          this.totalEntities = ret[0]['count'];
        }
      );
  }
}