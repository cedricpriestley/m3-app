import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EntityService } from '../../../services/entity.service';
import { AreaService } from '../../../services/area.service';
import { Apollo } from 'apollo-angular';
import * as Query from '../../../global-query';

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
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const id = params.id;
        //const type = params.type;
        this.entityService.lookup(id, this.type)
          .subscribe(entity => {
            this.entity = entity;
          });
      },
    );
  }

  /**
 * Remove User
 * @param id
 */
  reset() {
    this.apollo
      .mutate({
        mutation: Query.resetArea,
        variables: {
          id: this.entity['id']
        },
        update: (proxy, { data: { resetArea } }) => {
          // Read the data from our cache for this query.
          const data: any = proxy.readQuery({ query: Query.getAreas });

          var index = data.users.map(function (x) { return x.id; }).indexOf(this.entity['id']);

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
  }


  import(): void {
    this.route.params.subscribe(
      params => {
        const id = params.id;
        this.entityService.import(id, this.type)
          .subscribe(entity => {
            this.entity = entity;
          });
      },
    );
  }

  reset2(): void {
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
}