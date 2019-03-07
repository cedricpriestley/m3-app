import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  //styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  artists: Object[] = [];

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.getTopArtists();
  }

  getTopArtists(): void {
    this.artistService.getTopArtists()
      .subscribe(artists => this.artists = artists.slice(0, 10));

  }
}
