import { TestBed } from '@angular/core/testing';

import { ReleaseGroupService } from './release-group.service';

describe('ReleaseGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReleaseGroupService = TestBed.get(ReleaseGroupService);
    expect(service).toBeTruthy();
  });
});
