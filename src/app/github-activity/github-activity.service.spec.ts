/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GithubActivityService } from './github-activity.service';

describe('GithubActivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubActivityService]
    });
  });

  it('should ...', inject([GithubActivityService], (service: GithubActivityService) => {
    expect(service).toBeTruthy();
  }));
});
