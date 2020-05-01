import { TestBed } from '@angular/core/testing';
import { ProductdetailService } from './productdetail.service';

describe('ProductdetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductdetailService = TestBed.get(ProductdetailService);
    expect(service).toBeTruthy();
  });
});
