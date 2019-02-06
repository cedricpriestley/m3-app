import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArtistService } from '../artist.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {

  artist: Object;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getArtist();
  }

  getArtist(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.artistService.getArtist(id)
      .subscribe(artist => {
        this.artist = artist;
        //this.artist.gender = Gender.Female;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
