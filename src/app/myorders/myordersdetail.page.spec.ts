import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyordersdetailPage } from './myordersdetail.page';

describe('MyordersdetailPage', () => {
  let component: MyordersdetailPage;
  let fixture: ComponentFixture<MyordersdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyordersdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyordersdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
