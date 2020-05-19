import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AllproductslistPage } from './allproductslist.page';

describe('AllproductslistPage', () => {
  let component: AllproductslistPage;
  let fixture: ComponentFixture<AllproductslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllproductslistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllproductslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
