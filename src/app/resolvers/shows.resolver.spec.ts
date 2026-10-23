import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { showsResolver } from './shows.resolver';

describe('showsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => showsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
