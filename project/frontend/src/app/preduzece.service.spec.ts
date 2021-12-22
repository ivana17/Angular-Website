import { TestBed } from '@angular/core/testing';

import { PreduzeceService } from './preduzece.service';

describe('PreduzeceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreduzeceService = TestBed.get(PreduzeceService);
    expect(service).toBeTruthy();
  });
});
