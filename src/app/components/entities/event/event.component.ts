import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../../../services/entity.service';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  entity: Object;
  type: string = 'event';

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private eventService: EventService,
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