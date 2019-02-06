import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent
 {

  artists: Object[];
  //selectedArtist: Artist;

  p: number = 1;
  total: number = 12;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: Object[];

  constructor(private artistService: ArtistService) {
  }

  ngOnInit() {
    this.getArtists();
  }

  //onSelect(artist: Artist): void {
  //this.selectedArtist = artist;
  //}

  getArtists(): void {
    this.artistService.getTopArtists()
      .subscribe(artists => {
        this.artists = artists});
  }
}
