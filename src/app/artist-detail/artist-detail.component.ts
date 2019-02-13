import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../entity.service';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {

  entity: Object;
  type: string = 'artist';

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private artistService: ArtistService,
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