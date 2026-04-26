import { TestBed } from '@angular/core/testing';

import { Favourites } from './favourites.service';

describe('Favourites', () => {
  let service: Favourites;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Favourites);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
