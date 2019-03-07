import { NgModule } from '@angular/core';
import { Routes, RouterModule, } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AreaComponent } from './components/entities/area/area.component';
import { EventComponent } from './components/entities/event/event.component';
import { LabelComponent } from './components/entities/label/label.component';
import { PlaceComponent } from './components/entities/place/place.component';
import { ArtistComponent } from './components/entities/artist/artist.component';
import { ReleaseComponent } from './components/entities/release/release.component';
import { ReleaseGroupComponent } from './components/entities/release-group/release-group.component';
import { AreasComponent } from './components/lists/areas/areas.component';
import { ArtistsComponent } from './components/lists/artists/artists.component';
import { ReleasesComponent } from './components/lists/releases/releases.component';
import { ReleaseGroupsComponent } from './components/lists/release-groups/release-groups.component';
import { ArtistReleaseGroupsComponent } from './components/lists/artist-release-groups/artist-release-groups.component';
import { ArtistReleasesComponent } from './components/lists/artist-releases/artist-releases.component';
import { ReleaseGroupReleasesComponent } from './components/lists/release-group-releases/release-group-releases.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full',
    //canActivate: [AuthenticationGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'home', component: HomeComponent,
    runGuardsAndResolvers: 'always'
  },
  { path: 'areas', component: AreasComponent, runGuardsAndResolvers: 'always' },
  { path: 'artists', component: ArtistsComponent, runGuardsAndResolvers: 'always' },
  { path: 'releases', component: ReleasesComponent, runGuardsAndResolvers: 'always' },
  { path: 'release-groups', component: ReleaseGroupsComponent, runGuardsAndResolvers: 'always' },
  { path: 'artist/:id', component: ArtistComponent, runGuardsAndResolvers: 'always' },
  { path: 'artist/:id/release-groups', component: ArtistReleaseGroupsComponent, runGuardsAndResolvers: 'always' },
  { path: 'release-group/:id', component: ReleaseGroupComponent, runGuardsAndResolvers: 'always' },
  { path: 'release-group/:id/releases', component: ReleaseGroupReleasesComponent, runGuardsAndResolvers: 'always' },
  { path: 'area/:id', component: AreaComponent, runGuardsAndResolvers: 'always' },
  { path: 'artist/:id/releases', component: ArtistReleasesComponent, runGuardsAndResolvers: 'always' },
  { path: 'event/:id', component: EventComponent, runGuardsAndResolvers: 'always' },
  { path: 'label/:id', component: LabelComponent, runGuardsAndResolvers: 'always' },
  { path: 'place/:id', component: PlaceComponent, runGuardsAndResolvers: 'always' },
  { path: 'release/:id', component: ReleaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
