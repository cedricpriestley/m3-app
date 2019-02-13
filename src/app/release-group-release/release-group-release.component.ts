import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../entity.service';
import { ArtistService } from '../artist.service';
import { ReleaseGroupService } from '../release-group.service';
import { ReleaseService } from '../release.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-release-group-release',
  templateUrl: './release-group-release.component.html',
  styleUrls: ['./release-group-release.component.css']
})
export class ReleaseGroupReleaseComponent implements OnInit {
  //@Input() artist: Artist;
  artist: Object;
  releases: Object[];
  releaseGroup: Object;
  p: number = 1;
  totalItems: number;
  itemsPerPage: number = 100;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private releaseGroupService: ReleaseGroupService,
    private releaseService: ReleaseService,
    private artistService: ArtistService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getArtist();
    this.getReleaseGroup();
    this.getPage(1);
  }

  getArtist(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.artistService.getArtist(id)
      .subscribe(artist => this.artist = artist);
  }

  getReleaseGroup(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.releaseGroupService.getReleaseGroup(id)
      .subscribe(releaseGroup => {
        this.releaseGroup = releaseGroup;
      });
  }
  /*
    getReleaseGroup(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.artistService.getArtist(id)
        .subscribe(artist => this.artist = artist);
    }
  */
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
            //let media: Media = ret['media']
            .filter(release => release.country == 'US')
            //.filter(release => release.status == 'Official')
            //.filter(release => release.media.format == 'CD')
            ;
          this.p = page;
        }
      );
  }

  goBack(): void {
    this.location.back();
  }
}