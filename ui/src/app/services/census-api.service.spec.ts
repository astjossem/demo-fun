import { TestBed } from '@angular/core/testing';

import { CensusApiService } from './census-api.service';

describe('CensusApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CensusApiService = TestBed.get(CensusApiService);
    expect(service).toBeTruthy();
  });
});
