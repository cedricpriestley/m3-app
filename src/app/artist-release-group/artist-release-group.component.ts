import { Component, OnInit, Input } from '@angular/core';;
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArtistService } from '../artist.service';
import { ReleaseGroupService } from '../release-group.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artist-release-group',
  templateUrl: './artist-release-group.component.html',
  //styleUrls: ['./artist-release-group.component.css']
})
export class ArtistReleaseGroupComponent implements OnInit {
  //@Input() artist: Artist;
  artist: Object;
  releaseGroups: Object[];
  p: number = 1;
  totalItems: number;
  itemsPerPage: number = 100;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private releaseGroupService: ReleaseGroupService,
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
    this.releaseGroupService.getReleaseGroups(id, offset, this.itemsPerPage, releaseType)
      .subscribe(
        ret => {
          this.totalItems = ret['release-group-count'];
          this.releaseGroups = ret['release-groups']
            //.filter(releaseGroup => releaseGroup.releases[0].country == 'US');
          this.p = page;
        }
      );
  }

  goBack(): void {
    this.location.back();
  }
}