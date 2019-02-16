import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseGroupsComponent } from './release-groups.component';

describe('ReleaseGroupsComponent', () => {
  let component: ReleaseGroupsComponent;
  let fixture: ComponentFixture<ReleaseGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
