import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../../../services/entity.service';
import { MusicBrainzService } from '../../../services/music-brainz.service';
import { ArtistService } from '../../../services/artist.service';
//artist's upcoming events
//https://api.songkick.com/api/3.0/artists/mbid:650e7db6-b795-4eb5-a702-5ea2fc46c848/calendar.json?apikey=GD60kmKf1lgId3wO
//venue's upcoming events
//https://api.songkick.com/api/3.0/venues/3410514/calendar.xml?apikey=GD60kmKf1lgId3wO
@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  entity: {};
  entityName = 'Artist';
  type = 'artist';

  constructor(
    private route: ActivatedRoute,
    private musicBrainzService: MusicBrainzService,
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

  importMbz(): void {
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