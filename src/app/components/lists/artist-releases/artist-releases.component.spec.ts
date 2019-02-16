import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistReleasesComponent } from './artist-releases.component';

describe('ArtistReleasesComponent', () => {
  let component: ArtistReleasesComponent;
  let fixture: ComponentFixture<ArtistReleasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistReleasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
