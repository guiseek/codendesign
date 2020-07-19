import { RouterTestingModule } from '@angular/router/testing';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { TestBed } from '@angular/core/testing';

import { DocsService } from './docs.service';

describe('DocsService', () => {
  let service: DocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ScullyLibModule
      ]
    });
    service = TestBed.inject(DocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
