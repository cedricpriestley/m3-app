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
              _id
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
                partOfArea {
                  areas {
                    nodes {
                      target {
                        mbid
                        name
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
              }
              endArea {
                mbid
                name
                sortName
                disambiguation
              }
              relationships {
                artists {
                  nodes {
                    type
                    targetType
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
                events {
                  nodes {
                    type
                    targetType
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
                instruments {
                  nodes {
                    type
                    targetType
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
                labels {
                  nodes {
                    type
                    targetType
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
                places {
                  nodes {
                    type
                    targetType
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
                recordings {
                  nodes {
                    type
                    targetType
                    direction
                    begin
                    end
                    ended
                    targetCredit
                    sourceCredit
                    target {
                      mbid
                      title
                    }
                    attributes
                  }
                }
                releases {
                  nodes {
                    type
                    targetType
                    direction
                    begin
                    end
                    ended
                    targetCredit
                    sourceCredit
                    target {
                      mbid
                      title
                    }
                    attributes
                  }
                }
                releaseGroups {
                  nodes {
                    type
                    targetType
                    direction
                    begin
                    end
                    ended
                    targetCredit
                    sourceCredit
                    target {
                      mbid
                      title
                    }
                    attributes
                  }
                }
                works {
                  nodes {
                    type
                    targetType
                    direction
                    begin
                    end
                    ended
                    targetCredit
                    sourceCredit
                    target {
                      mbid
                      title
                    }
                    attributes
                  }
                }
                urls {
                  nodes {
                    type
                    targetType
                    direction
                    begin
                    end
                    ended
                    targetCredit
                    sourceCredit
                    target {
                      mbid
                      resource
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
                tags {
                  name
                  count
                }
              }
              lastFM {
                smallImage
                mediumImage
                largeImage
                extraLargeImage
                megaImage
                similarArtists {
                  similarArtists {
                    mbid
                    name
                    image
                  }
                }
                url
                tags {
                  tags {
                    name
                    url
                  }
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
    result: lookup {
      artist(mbid: "${id}") {
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
            partofArea: relationships {
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
            partofArea: relationships {
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
            partofArea: relationships {
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
          artists {
            nodes {
              type
              targetType
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
              targetType
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
              targetType
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
              targetType
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
              targetType
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
              targetType
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
              targetType
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
              targetType
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
              targetType
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
              targetType
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
              targetType
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
          tags: nodes {
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
            similarArtists: nodes {
              mbid
              name
              image(size: MEGA)
            }
          }
          url
          tags: topTags {
            tags: nodes {
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
    partofArea: relationships {
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
    partofArea: relationships {
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
    partofArea: relationships {
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
    partofArea: relationships {
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
        console.log('got data', result.data.result.artist);
        //this.entity = result.data.result.artist;
        //this.saveArtist(result.data.result.artist);
        //this.loading = result.loading;
        //this.error = result.error;
        this.artistService.saveArtist(JSON.stringify(result.data.result.artist))
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