import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../entity.service';
import { ReleaseService } from '../release.service';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.css']
})
export class ReleaseDetailComponent implements OnInit {

  entity: Object;
  type: string = 'release';

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private releaseService: ReleaseService,
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