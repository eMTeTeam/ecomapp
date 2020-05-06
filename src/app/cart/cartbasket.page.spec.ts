import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartbasketPage } from './cartbasket.page';

describe('CartbasketPage', () => {
  let component: CartbasketPage;
  let fixture: ComponentFixture<CartbasketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartbasketPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartbasketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
