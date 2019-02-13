import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../entity.service';
import { ReleaseGroupService } from '../release-group.service';

@Component({
  selector: 'app-release-group-detail',
  templateUrl: './release-group-detail.component.html',
  styleUrls: ['./release-group-detail.component.css']
})
export class ReleaseGroupDetailComponent implements OnInit {

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

  goBack(): void {
    this.location.back();
  }
}