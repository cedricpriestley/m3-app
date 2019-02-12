import { Component, OnInit } from '@angular/core';
import { EntityService } from '../entity.service';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {

  entities: Object[];
  entityName = 'Artist';

  p: number = 1;
  totalItems: number;
  itemsPerPage: number = 50;
  loading: boolean;
  totalEntities: number = 0;

  constructor(
    private entityService: EntityService,
    private artistService: ArtistService) {
  }

  ngOnInit() {
    //this.getTotal();
    this.getTop();
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

  count(): void {
    this.entityService.getEntityCount(this.entityName)
      .subscribe(
        ret => {
          this.totalEntities = ret[0]['count'];
        }
      );
  }

  getTop(): void {
    this.artistService.getTopArtists()
      .subscribe(entities => {
        this.entities = entities
      });
  }
}
