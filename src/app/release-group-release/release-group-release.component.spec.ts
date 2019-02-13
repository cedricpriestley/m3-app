import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseGroupReleaseComponent } from './release-group-release.component';

describe('ReleaseGroupReleaseComponent', () => {
  let component: ReleaseGroupReleaseComponent;
  let fixture: ComponentFixture<ReleaseGroupReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseGroupReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseGroupReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
