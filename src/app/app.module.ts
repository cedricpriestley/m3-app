import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ArtistComponent } from './artist/artist.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxPaginationModule } from 'ngx-pagination';
import { EntitySearchComponent } from './entity-search/entity-search.component';
import { AreaComponent } from './area/area.component';
import { AreaDetailComponent } from './area-detail/area-detail.component';
import { ArtistReleaseGroupComponent } from './artist-release-group/artist-release-group.component';
import { ReleaseGroupDetailComponent } from './release-group-detail/release-group-detail.component';
import { ReleaseDetailComponent } from './release-detail/release-detail.component';
import { ReleaseGroupReleaseComponent } from './release-group-release/release-group-release.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistComponent,
    ArtistDetailComponent,
    MessagesComponent,
    HomeComponent,
    EntitySearchComponent,
    AreaComponent,
    AreaDetailComponent,
    ArtistReleaseGroupComponent,
    ArtistReleaseGroupComponent,
    ReleaseGroupDetailComponent,
    ReleaseDetailComponent,
    ReleaseGroupReleaseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxJsonViewerModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
