import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ArtistComponent } from './components/entities/artist/artist.component';
import { MessagesComponent } from './components/messages/messages.component';
import { HomeComponent } from './components/home/home.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxPaginationModule } from 'ngx-pagination';
import { AreasComponent } from './components/lists/areas/areas.component';
import { AreaComponent } from './components/entities/area/area.component';
import { ArtistReleaseGroupsComponent } from './components/lists/artist-release-groups/artist-release-groups.component';
import { ReleaseGroupsComponent } from './components/lists/release-groups/release-groups.component';
import { ReleaseComponent } from './components/entities/release/release.component';
import { ReleaseGroupReleasesComponent } from './components/lists/release-group-releases/release-group-releases.component';
import { EventComponent } from './components/entities/event/event.component';
import { EventsComponent } from './components/lists/events/events.component';
import { LabelComponent } from './components/entities/label/label.component';
import { LabelsComponent } from './components/lists/labels/labels.component';
import { PlaceComponent } from './components/entities/place/place.component';
import { PlacesComponent } from './components/lists/places/places.component';
import { ReleaseGroupComponent } from './components/entities/release-group/release-group.component';
import { SearchBoxComponent } from './components/search/search-box/search-box.component';
import { SearchResultComponent } from './components/search/search-result/search-result.component';
import { ArtistReleasesComponent } from './components/lists/artist-releases/artist-releases.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistComponent,
    MessagesComponent,
    HomeComponent,
    AreaComponent,
    AreasComponent,
    ArtistReleaseGroupsComponent,
    ReleaseGroupComponent,
    ReleaseGroupReleasesComponent,
    EventComponent,
    EventsComponent,
    LabelComponent,
    LabelsComponent,
    PlaceComponent,
    PlacesComponent,
    ReleaseGroupComponent,
    SearchBoxComponent,
    SearchResultComponent,
    ArtistReleasesComponent,
    ArtistReleaseGroupsComponent,
    ReleaseGroupsComponent,
    ReleaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxJsonViewerModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
