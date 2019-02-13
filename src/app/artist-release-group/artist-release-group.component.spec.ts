import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistReleaseGroupComponent } from './artist-release-group.component';

describe('ArtistReleaseGroupComponent', () => {
  let component: ArtistReleaseGroupComponent;
  let fixture: ComponentFixture<ArtistReleaseGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistReleaseGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistReleaseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
