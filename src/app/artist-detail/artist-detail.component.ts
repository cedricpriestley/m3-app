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
  id: string;

  constructor(
    private route: ActivatedRoute,
    private entityService:EntityService,
    private artistService:ArtistService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const id = params.id;
        this.entityService.getEntity(id, 'artist')
          .subscribe(entity => {
            this.entity = entity;
          });
      },
    );
  }

  import(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.artistService.importArtist(id)
      .subscribe(entity => {
        this.entity = entity;
      });
  }

  reset(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.artistService.resetArtist(id)
      .subscribe(entity => {
        this.entity = entity;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
