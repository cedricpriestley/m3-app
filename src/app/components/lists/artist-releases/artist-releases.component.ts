import { Component, OnInit, Input } from '@angular/core';;
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArtistService } from '../../../services/artist.service';
import { ReleaseService } from '../../../services/release.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artist-releases',
  templateUrl: './artist-releases.component.html',
  styleUrls: ['./artist-releases.component.css']
})
export class ArtistReleasesComponent implements OnInit {
  artist: Object;
  releases: Object[];
  p: number = 1;
  totalItems: number;
  itemsPerPage: number = 100;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private releaseService: ReleaseService,
    private artistService: ArtistService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getArtist();
    this.getPage(1);
  }

  getArtist(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.artistService.getArtist(id)
      .subscribe(artist => this.artist = artist);
  }

  getPage(page: number): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    let offset = page * (this.itemsPerPage) - this.itemsPerPage;
    let releaseType = 'album|ep|single';
    this.releaseService.getReleases(id, offset, this.itemsPerPage, releaseType)
      .subscribe(
        ret => {
          this.totalItems = ret['release-count'];
          this.releases = ret['releases']
          this.p = page;
        }
      );
  }
}