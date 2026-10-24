import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { showDetailsResolver } from './show-details.resolver';

describe('showDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => showDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
