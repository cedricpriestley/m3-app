import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
//import { SearchResult } from '../models/search-result.model';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'm3-app';
  artistResults: Object[];
  releaseResults: Object[];
  loading: boolean;
  artistMessage = '';
  releaseMessage = '';

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  updateArtistResults(artistResults: Object[]): void {
    this.artistResults = artistResults;
    if (this.artistResults.length === 0) {
      //this.message = 'Not found...';
    } else {
      this.artistMessage = 'Artist Results';
    }
  }

  updateReleaseResults(releaseResults: Object[]): void {
    this.releaseResults = releaseResults;
    if (this.releaseResults.length === 0) {
      //this.message = 'Not found...';
    } else {
      this.releaseMessage = 'Album Results';
    }
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
  }
}