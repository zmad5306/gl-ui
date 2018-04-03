import { TestBed, inject } from '@angular/core/testing';

import { ListsService } from './lists.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListsService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should be created', inject([ListsService], (service: ListsService) => {
    expect(service).toBeTruthy();
  }));
});
