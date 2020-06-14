import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedPage } from './received.page';

describe('ReceivedPage', () => {
  let component: ReceivedPage;
  let fixture: ComponentFixture<ReceivedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
