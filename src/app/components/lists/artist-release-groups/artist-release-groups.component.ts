import { Component, OnInit, Input } from '@angular/core';;
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ArtistService } from '../../../services/artist.service';
import { ReleaseGroupService } from '../../../services/release-group.service';
import { FormsModule } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-artist-release-groups',
  templateUrl: './artist-release-groups.component.html',
  styleUrls: ['./artist-release-groups.component.css']
})
export class ArtistReleaseGroupsComponent implements OnInit {
  //@Input() artist: Artist;
  artist: Object;
  releaseGroups: Object[];
  p: number = 1;
  totalItems: number;
  itemsPerPage: number = 50;
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private releaseGroupService: ReleaseGroupService,
    private artistService: ArtistService,
    private location: Location,
    private apollo: Apollo
  ) {
  }

  ngOnInit() {
    //this.getArtist();
    this.getPage(1);
    return;
    this.route.params.subscribe(
      params => {
        const id = params.id;
        this.apollo
          .watchQuery({
            query: gql`
            query {
              result: browse {
                releaseGroups(artist:"${id}") {
                  totalCount
                  releaseGroups: nodes {
                    mbid
                    title
                    primaryType
                    secondaryTypes
                    firstReleaseDate
                    rating {
                      voteCount
                      value
                    }
                    tags {
                      tags: nodes {
                        name
                        count
                      }
                    }
                    artistCredits {
                      artist {
                        mbid
                      }
                      name
                      joinPhrase
                    }
                    discogs {
                      genres
                      styles
                      url
                      videos {
                        title
                        duration
                        description
                        url
                        embed
                      }
                    }
                  }
                }
              }
            }
      `,
          })
          .valueChanges
          .pipe(
            map((result: any) => result)
          )
          .subscribe(result => {
            alert('hello');
            this.releaseGroups = result.data.result.releaseGroups.releaseGroups;
            //this.loading = result.loading;
            //this.error = result.error;
          });
      });
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
          this.p = page;
        }
      );
  }
}