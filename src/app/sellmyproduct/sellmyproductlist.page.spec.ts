import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SellmyproductlistPage } from './sellmyproductlist.page';

describe('SellmyproductlistPage', () => {
  let component: SellmyproductlistPage;
  let fixture: ComponentFixture<SellmyproductlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellmyproductlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellmyproductlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
