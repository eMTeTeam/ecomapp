import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewModalPage } from './review-modal.page';

describe('ReviewModalPage', () => {
  let component: ReviewModalPage;
  let fixture: ComponentFixture<ReviewModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
