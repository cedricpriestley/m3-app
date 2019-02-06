import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    ArtistDetailComponent,
    MessagesComponent,
    HomeComponent,
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
