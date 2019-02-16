import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AreaComponent } from './components/entities/area/area.component';
import { EventComponent } from './components/entities/event/event.component';
import { LabelComponent } from './components/entities/label/label.component';
import { PlaceComponent } from './components/entities/place/place.component';import { ArtistComponent } from './components/entities/artist/artist.component';
import { ReleaseComponent } from './components/entities/release/release.component';
import { ReleaseGroupComponent } from './components/entities/release-group/release-group.component';
import { AreasComponent } from './components/lists/areas/areas.component';
import { ArtistReleaseGroupsComponent } from './components/lists/artist-release-groups/artist-release-groups.component';
import { ArtistReleasesComponent } from './components/lists/artist-releases/artist-releases.component';
import { ReleaseGroupReleasesComponent } from './components/lists/release-group-releases/release-group-releases.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'artist/:id', component: ArtistComponent },
  { path: 'artist/:id/release-groups', component: ArtistReleaseGroupsComponent },
  { path: 'release-group/:id', component: ReleaseGroupComponent },
  { path: 'release-group/:id/release', component: ReleaseGroupReleasesComponent },
  { path: 'area/:id', component: AreaComponent },
  { path: 'artist/:id/releases', component: ArtistReleasesComponent },
  { path: 'event/:id', component: EventComponent },
  { path: 'label/:id', component: LabelComponent },
  { path: 'place/:id', component: PlaceComponent },
  { path: 'release/:id', component: ReleaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
