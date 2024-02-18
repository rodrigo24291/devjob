import { TestBed } from '@angular/core/testing';

import { VerifiDevGuard } from './verifi-dev.guard';

describe('VerifiDevGuard', () => {
  let guard: VerifiDevGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifiDevGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
