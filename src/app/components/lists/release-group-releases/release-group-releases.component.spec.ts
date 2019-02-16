import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseGroupReleasesComponent } from './release-group-releases.component';

describe('ReleaseGroupReleasesComponent', () => {
  let component: ReleaseGroupReleasesComponent;
  let fixture: ComponentFixture<ReleaseGroupReleasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseGroupReleasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseGroupReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
