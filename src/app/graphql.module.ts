import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestLink } from 'apollo-link-rest';
// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// const uri = 'http://localhost:8000/graphql'; // Development

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    // create Apollo
    let uri = 'http://localhost:8000/graphbrainz'; // Production
    apollo.createDefault({
      link: httpLink.create({ uri }),
      cache: new InMemoryCache()
    });
    uri = 'http://localhost:8000/graphql'; // Production
    apollo.createNamed("mutations", {
      link: httpLink.create({ uri }),
      cache: new InMemoryCache()
    });
  }
}