import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../../../services/entity.service';
import { AreaService } from '../../../services/area.service';
import { Apollo } from 'apollo-angular';
import * as Query from '../../../global-query';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import gql from 'graphql-tag';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  entity: Object;
  type: string = 'area';

  constructor(
    private route: ActivatedRoute,
    private entityService: EntityService,
    private areaService: AreaService,
    private location: Location,
    //private apollo: Apollo
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const mbid = params.id;
        const type = params.type;
        this.entityService.lookup(mbid, this.type)
          .subscribe(entity => {
            this.entity = entity;
          });

        // setup your `RestLink` with your endpoint
        //let uri = 'https://swapi.co/api/people/1/';
        //     let uri = `https://musicbrainz.org/ws/2/area/${mbid}?inc=aliases+ratings+tags+area-rels&fmt=json`;
        //     console.log(uri);
        //     const areaRestLink = new RestLink({
        //       uri:
        //         uri
        //     });

        //     // setup your client
        //     const client = new ApolloClient({
        //       link: areaRestLink,
        //       cache: new InMemoryCache(),
        //     });

        //     const query = gql`
        //       query area {
        //         area @rest(type: "Area", path: "") {
        //           name
        //           disambiguation
        //           sort-name
        //           type
        //           type-id
        //           aliases
        //           life-span
        //           tags
        //         }
        //       }
        //     `;

        //     // Invoke the query and log the person's name
        //     client.query({ query }).then(response => {
        //       console.log(response.data);
        //     });
      },
    );

    /*
    this.apollo
      .mutate({
        mutation: Query.createArea,
        variables: {
          areaInput: this.entity
        },
        update: (proxy, { data: { createArea } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.getArea });

          const index = data.users.map((x) => { return x.mbid; }).indexOf(this.entity['id']);

          data.users.splice(index, 1);

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.getAreas, data });
        }
      })
      .subscribe(({ data }) => {
        console.log(data)
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
      */
  }

  /**
 * Remove User
 * @param id
 */
  reset() {
    /*
    this.apollo
      .mutate({
        mutation: Query.resetArea,
        variables: {
          mbid: this.entity.mbid
        },
        update: (proxy, { data: { resetArea } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.getAreas });

          var index = data.users.map(function (x) { return x.mbid; }).indexOf(this.entity['id']);

          data.users.splice(index, 1);

          // Write our data back to the cache.
          proxy.writeQuery({ query: Query.getAreas, data });
        }
      })
      .subscribe(({ data }) => {
        console.log(data)
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
    */
  }


  import(): void {
    this.route.params.subscribe(
      params => {
        const mbid = params.mbid;
        this.entityService.import(mbid, this.type)
          .subscribe(entity => {
            this.entity = entity;
          });
      },
    );
  }

  reset2(): void {
    this.route.params.subscribe(
      params => {
        const mbid = params.mbid;
        this.entityService.reset(mbid, this.type)
          .subscribe(entity => {
            this.entity = entity;
          });
      },
    );
  }
}