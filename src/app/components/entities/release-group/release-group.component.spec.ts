import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseGroupComponent } from './release-group.component';

describe('ReleaseGroupComponent', () => {
  let component: ReleaseGroupComponent;
  let fixture: ComponentFixture<ReleaseGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
