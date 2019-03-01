import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
import { EntityService } from '../../../services/entity.service';
import { AreaService } from '../../../services/area.service';
//import { Area, Query } from '../../../types';
import { Apollo } from 'apollo-angular';
import * as Query from '../../../global-query';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  entityName = 'Area';
  entities: Object[];
  areas: Array<any> = [];

  p: number = 1;
  totalItems: number;
  itemsPerPage: number = 50;
  loading: boolean;
  totalEntities: number = 0;

  constructor(
    private entityService: EntityService,
    private areaService: AreaService,
    private apollo: Apollo
  ) {
  }

  ngOnInit2() {
  }

  ngOnInit() {

    this.getCount();
    //this.getTop();
    this.getPage(1);
  }

  /**
   * ----------------------------------------------------
   * Get All Areas
   * ----------------------------------------------------
   * @method getPage
   */
  getPage(page: number): void {
    let offset = page * (this.itemsPerPage) - this.itemsPerPage;
    this.apollo.watchQuery({
      query: Query.getAreas,
      variables: {
        limit: this.itemsPerPage,
        offset: offset
      }
    })
    .valueChanges
    .pipe(
    map((result: any) => result.data.getAreas)
    ).subscribe((data) => {
      this.areas = data;
    })
  }


  getPage2(page: number): void {
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