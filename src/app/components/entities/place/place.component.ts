import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../../../services/entity.service';
import { PlaceService } from '../../../services/place.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  entity: Object;
  type: string = 'place';

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private placeService: PlaceService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const id = params.id;
        //const type = params.type;
        this.entityService.lookup(id, this.type)
          .subscribe(entity => {
            this.entity = entity;
          });
      },
    );
  }

  import(): void {
    this.route.params.subscribe(
      params => {
        const id = params.id;
        this.entityService.import(id, this.type)
          .subscribe(entity => {
            this.entity = entity;
          });
      },
    );
  }

  reset(): void {
    this.route.params.subscribe(
      params => {
        const id = params.id;
        this.entityService.reset(id, this.type)
          .subscribe(entity => {
            this.entity = entity;
          });
      },
    );
  }
}