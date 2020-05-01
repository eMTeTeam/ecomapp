import { TestBed } from '@angular/core/testing';
import { SellmyproductlistService } from './sellmyproductlist.service';

describe('SellmyproductlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellmyproductlistService = TestBed.get(SellmyproductlistService);
    expect(service).toBeTruthy();
  });
});
