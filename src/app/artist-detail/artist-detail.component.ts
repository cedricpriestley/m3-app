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
    const gid = this.route.snapshot.paramMap.get('gid');
    this.artistService.getArtist(gid)
      .subscribe(artist => {
        this.artist = artist;
        //this.artist.gender = Gender.Female;
      });
  }

  goBack(): void {
    this.location.back();
  }

  importArtist(): void {
    const gid = this.route.snapshot.paramMap.get('gid');
    this.artistService.importArtist(gid)
      .subscribe(artist => {
        this.artist = artist;
      });
  }

  resetArtist(): void {
    const gid = this.route.snapshot.paramMap.get('gid');
    this.artistService.resetArtist(gid)
      .subscribe(artist => {
        this.artist = artist;
      });
  }
}
