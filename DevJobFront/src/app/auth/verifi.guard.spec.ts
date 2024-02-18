import { TestBed } from '@angular/core/testing';

import { VerifiGuard } from './verifi.guard';

describe('VerifiGuard', () => {
  let guard: VerifiGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifiGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
