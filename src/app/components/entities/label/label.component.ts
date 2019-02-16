import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../../../services/entity.service';
import { LabelService } from '../../../services/label.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  entity: Object;
  type: string = 'label';

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private labelService: LabelService,
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