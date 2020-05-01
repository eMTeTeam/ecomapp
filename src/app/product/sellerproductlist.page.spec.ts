import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerproductlistPage } from './sellerproductlist.page';

describe('SellerproductlistPage', () => {
  let component: SellerproductlistPage;
  let fixture: ComponentFixture<SellerproductlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SellerproductlistPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerproductlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
