import { Component, OnInit } from '@angular/core';
import { EntityService } from '../../../services/entity.service';
import { PlaceService } from '../../../services/place.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent {

  entities: Object[];
  entityName = 'Place';

  p: number = 1;
  totalItems: number;
  itemsPerPage: number = 50;
  loading: boolean;
  totalEntities: number = 0;

  constructor(
    private entityService: EntityService,
    private placeService: PlaceService) {
  }

  ngOnInit() {
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
