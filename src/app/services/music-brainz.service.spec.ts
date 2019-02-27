import { TestBed } from '@angular/core/testing';

import { MusicBrainzService } from './music-brainz.service';

describe('MusicBrainzService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MusicBrainzService = TestBed.get(MusicBrainzService);
    expect(service).toBeTruthy();
  });
});
