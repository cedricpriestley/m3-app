import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../../../services/entity.service';
import { MusicBrainzService } from '../../../services/music-brainz.service';
import { ArtistService } from '../../../services/artist.service';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Artist, Query } from '../../types/artist';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';

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
  type = 'artist';

  constructor(
    private route: ActivatedRoute,
    private musicBrainzService: MusicBrainzService,
    private entityService:
      EntityService,
    private artistService: ArtistService,
    private location: Location,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      params => {
        const id = params.id;
        this.lookupArtist(id);
        //.subscribe(entity => {
        //  console.log(entity);
        //  if (entity) {
        //    this.entity = entity;
        //  } else {
        //    this.saveArtist(id);
        //    this.lookupArtist(id);
        //  }
        //});
      });
  }

  lookupArtist(id) {
    this.apollo.use('mutations')
      .watchQuery({
        query: gql`
          query {
            getArtist(mbid: "${id}") {
              mbid
              name
              sortName
              disambiguation
              country
              type
              typeID
              rating {
                voteCount
                value
              }
              gender
              genderID
              lifeSpan {
                begin
                end
                ended
              }
              area {
                mbid
                name
                sortName
                disambiguation
                area {
                  mbid
                  name
                  area {
                    mbid
                    name
                    area {
                      mbid
                      name
                    }
                  }
                }
              }
              beginArea {
                mbid
                name
                sortName
                disambiguation
                area {
                  mbid
                  name
                  area {
                    mbid
                    name
                    area {
                      mbid
                      name
                    }
                  }
                }
              }
              endArea {
                mbid
                name
                sortName
                disambiguation
                area {
                  mbid
                  name
                  area {
                    mbid
                    name
                    area {
                      mbid
                      name
                    }
                  }
                }
              }
              relationships {
                artists {
                  teacher {
                    direction
                    begin
                    end
                    ended
                    targetCredit
                    sourceCredit
                    target {
                      mbid
                      name
                    }
                    attributes
                  }
                }
              }
              aliases {
                name
                type
              }
              tags {
                name
                count
              }
              lastFM {
                smallImage
                mediumImage
                largeImage
                extraLargeImage
                megaImage
                similarArtists {
                  mbid
                  name
                  image
                }
                url
                topTags {
                  name
                  url
                }
                biography {
                  summaryHTML
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
      .subscribe((result) => {
        console.log('got data', result);
        if (!result.data.getArtist) {
          this.saveArtist(id);
        } else {
          this.entity = result.data.getArtist
        }
        // this.artistService.lookupArtist(JSON.stringify(result.data.result.artist))
        //   .subscribe(({ data }) => {
        //     console.log('got data', data);
        //     this.entity = data.saveArtist;
        //   }, (error) => {
        //     console.log('there was an error sending the lookup artist query', error);
        //   });
      }, (error) => {
        console.log('there was an error sending the save artist query', error);
      });
  }

  saveArtist(id) {
    this.apollo
      .watchQuery({
        query: gql`
 query {
  lookup {
    artist(mbid: "650e7db6-b795-4eb5-a702-5ea2fc46c848") {
      mbid
      name
      sortName
      disambiguation
      country
      type
      typeID
      rating {
        voteCount
        value
      }
      gender
      genderID
      lifeSpan {
        begin
        end
        ended
      }
      area {
        mbid
        name
        sortName
        disambiguation
        ... on Area {
          relationships {
            areas(type: "part of", direction: "backward") {
              nodes {
                target {
                  ... on Area {
                    mbid
                    name
                    ...partOfArea
                  }
                }
              }
            }
            placeholder: series {
              nodes {
                type
              }
            }
          }
        }
      }
      beginArea {
        mbid
        name
        sortName
        disambiguation
        ... on Area {
          relationships {
            areas(type: "part of", direction: "backward") {
              nodes {
                target {
                  ... on Area {
                    mbid
                    name
                    ...partOfArea
                  }
                }
              }
            }
            placeholder: series {
              nodes {
                type
              }
            }
          }
        }
      }
      endArea {
        mbid
        name
        sortName
        disambiguation
        ... on Area {
          relationships {
            areas(type: "part of", direction: "backward") {
              nodes {
                target {
                  ... on Area {
                    mbid
                    name
                    ...partOfArea
                  }
                }
              }
            }
            placeholder: series {
              nodes {
                type
              }
            }
          }
        }
      }
      relationships {
        areas {
          nodes {
            type
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              ... on Area {
                mbid
                name
              }
            }
            attributes
          }
        }
        artists {
          nodes {
            type
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              ... on Artist {
                mbid
                name
              }
            }
            attributes
          }
        }
        events {
          nodes {
            type
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              ... on Event {
                mbid
                name
              }
            }
            attributes
          }
        }
        instruments {
          nodes {
            type
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              ... on Instrument {
                mbid
                name
              }
            }
            attributes
          }
        }
        labels {
          nodes {
            type
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              ... on Label {
                mbid
                name
              }
            }
            attributes
          }
        }
        places {
          nodes {
            type
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              ... on Place {
                mbid
                name
              }
            }
            attributes
          }
        }
        recordings {
          nodes {
            type
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              ... on Recording {
                mbid
                title
              }
            }
            attributes
          }
        }
        releases {
          nodes {
            type
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              ... on Release {
                mbid
                title
              }
            }
            attributes
          }
        }
        releaseGroups {
          nodes {
            type
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              ... on ReleaseGroup {
                mbid
                title
              }
            }
            attributes
          }
        }
        series {
          nodes {
            type
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              ... on Series {
                mbid
                name
              }
            }
            attributes
          }
        }
        works {
          nodes {
            type
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              ... on Work {
                mbid
                title
              }
            }
            attributes
          }
        }
        urls {
          nodes {
            type
            direction
            begin
            end
            ended
            targetCredit
            sourceCredit
            target {
              ... on URL {
                mbid
                resource
              }
            }
            attributes
          }
        }
        placeholder: series {
          nodes {
            type
          }
        }
      }
      aliases {
        name
        type
      }
      tags {
        nodes {
          name
          count
        }
      }
      lastFM {
        smallImage: image(size: SMALL)
        mediumImage: image(size: MEDIUM)
        largeImage: image(size: LARGE)
        extraLargeImage: image(size: EXTRALARGE)
        megaImage: image(size: MEGA)
        similarArtists {
          nodes {
            mbid
            name
            image(size: MEGA)
          }
        }
        url
        topTags {
          nodes {
            name
            url
          }
        }
        biography {
          summaryHTML
        }
      }
      discogs {
        members {
          name
        }
        profile
        images {
          url
          type
        }
        urls
      }
    }
  }
}

fragment partOfArea on Area {
  relationships {
    areas(type: "part of", direction: "backward") {
      nodes {
        target {
          ... on Area {
            mbid
            name
            ...partOfArea2
          }
        }
      }
    }
    placeholder: series {
      nodes {
        type
      }
    }
  }
}

fragment partOfArea2 on Area {
  relationships {
    areas(type: "part of", direction: "backward") {
      nodes {
        target {
          ... on Area {
            mbid
            name
            ...partOfArea3
          }
        }
      }
    }
    placeholder: series {
      nodes {
        type
      }
    }
  }
}

fragment partOfArea3 on Area {
  relationships {
    areas(type: "part of", direction: "backward") {
      nodes {
        target {
          ... on Area {
            mbid
            name
            ...partOfArea4
          }
        }
      }
    }
    placeholder: series {
      nodes {
        type
      }
    }
  }
}

fragment partOfArea4 on Area {
  relationships {
    areas(type: "part of", direction: "backward") {
      nodes {
        target {
          ... on Area {
            mbid
            name
          }
        }
      }
    }
    placeholder: series {
      nodes {
        type
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
        console.log('got data', result.data.lookup.artist);
        //this.entity = result.data.lookup.artist;
        //this.saveArtist(result.data.lookup.artist);
        //this.loading = result.loading;
        //this.error = result.error;
        this.artistService.saveArtist(JSON.stringify(result.data.lookup.artist))
          .subscribe(result => {
            console.log('got data', result);
            this.entity = result.data.saveArtist;
          }, (error) => {
            console.log('there was an error sending the save artist query', error);
          });
      });
  }
  /*
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
  */
}