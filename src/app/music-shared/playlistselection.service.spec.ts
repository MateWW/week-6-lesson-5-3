import { TestBed, inject } from '@angular/core/testing';

import { PlaylistselectionService } from './playlistselection.service';

describe('PlaylistselectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistselectionService]
    });
  });

  it('should ...', inject([PlaylistselectionService], (service: PlaylistselectionService) => {
    expect(service).toBeTruthy();
  }));
});
