import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RestLink } from 'apollo-link-rest';
// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// const uri = 'http://localhost:4000/graphql'; // Development
const uri = 'http://localhost:8000/graphql'; // Production

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
    apollo.create({
      link: httpLink.create({ uri }),
      cache: new InMemoryCache()
    });
  }
}