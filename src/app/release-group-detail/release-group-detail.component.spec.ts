import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseGroupDetailComponent } from './release-group-detail.component';

describe('ReleaseGroupDetailComponent', () => {
  let component: ReleaseGroupDetailComponent;
  let fixture: ComponentFixture<ReleaseGroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseGroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseGroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
