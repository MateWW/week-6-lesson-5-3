import { TestBed, inject } from '@angular/core/testing';

import { PlaylistConnectionService } from './playlist-connection.service';

describe('PlaylistConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaylistConnectionService]
    });
  });

  it('should ...', inject([PlaylistConnectionService], (service: PlaylistConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
