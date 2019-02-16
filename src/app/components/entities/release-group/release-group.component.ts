import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../../../services/entity.service';
import { ReleaseGroupService } from '../../../services/release-group.service';

@Component({
  selector: 'app-release-group',
  templateUrl: './release-group.component.html',
  styleUrls: ['./release-group.component.css']
})
export class ReleaseGroupComponent implements OnInit {

  entity: Object;
  type: string = 'release-group';

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private releaseGroupService: ReleaseGroupService,
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