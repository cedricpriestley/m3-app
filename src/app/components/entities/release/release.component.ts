import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../../../services/entity.service';
import { ReleaseService } from '../../../services/release.service';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.css']
})
export class ReleaseComponent implements OnInit {

  entity: Object;
  type: string = 'release';

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private releaseService: ReleaseService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        let title = data.title;
      }
    );
    this.route.params.subscribe(
      params => {
        const id = params.id;
        this.entityService.lookup(id, this.type)
          .subscribe(entity => {
            this.entity = entity;
            console.log(entity);
            if (!entity) {
              this.import();
            }
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