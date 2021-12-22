import { TestBed } from '@angular/core/testing';

import { PoljoprivrednikService } from './poljoprivrednik.service';

describe('PoljoprivrednikService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoljoprivrednikService = TestBed.get(PoljoprivrednikService);
    expect(service).toBeTruthy();
  });
});
