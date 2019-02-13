import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtistComponent } from './artist/artist.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistReleaseGroupComponent } from './artist-release-group/artist-release-group.component';
import { AreaComponent } from './area/area.component';
import { ReleaseGroupReleaseComponent } from './release-group-release/release-group-release.component';
import { AreaDetailComponent } from './area-detail/area-detail.component';
import { ReleaseGroupDetailComponent } from './release-group-detail/release-group-detail.component';
import { ReleaseDetailComponent } from './release-detail/release-detail.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'artist/:id',
    component: ArtistDetailComponent,
    data: { title: 'Artist Detail' }
  },
  {
    path: 'artist',
    component: ArtistComponent,
    data: { title: 'Artists' }
  },
  { path: 'artist/:id/release-groups', component: ArtistReleaseGroupComponent },
  { path: 'release-group/:id', component: ReleaseGroupDetailComponent },
  { path: 'release-group/:id/release', component: ReleaseGroupReleaseComponent },
  { path: 'area/:id', component: AreaDetailComponent },
  {
    path: 'area',
    component: AreaComponent,
    data: { title: 'Areas' }
  },
  { path: 'release/:id', component: ReleaseDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
