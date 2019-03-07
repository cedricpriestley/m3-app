import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../../../services/entity.service';
import { ReleaseGroupService } from '../../../services/release-group.service';
import { ReleaseService } from '../../../services/release.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-release-group-releases',
  templateUrl: './release-group-releases.component.html',
  styleUrls: ['./release-group-releases.component.css']
})
export class ReleaseGroupReleasesComponent implements OnInit {
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
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getReleaseGroup();
    this.getPage(1);
  }

  getReleaseGroup(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.releaseGroupService.getReleaseGroup(id)
      .subscribe(releaseGroup => {
        this.releaseGroup = releaseGroup;
      });
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
            //let media: Media = ret['media']
            //.filter(release => release.country == 'US')
            //.filter(release => release.status == 'Official')
            //.filter(release => release.media.format == 'CD')
            ;
          this.p = page;
        }
      );
  }
}