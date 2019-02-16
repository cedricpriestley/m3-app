import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistReleaseGroupsComponent } from './artist-release-groups.component';

describe('ArtistReleaseGroupsComponent', () => {
  let component: ArtistReleaseGroupsComponent;
  let fixture: ComponentFixture<ArtistReleaseGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistReleaseGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistReleaseGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
