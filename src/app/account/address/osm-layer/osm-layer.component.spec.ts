import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OsmLayerComponent } from './osm-layer.component';

describe('OsmLayerComponent', () => {
  let component: OsmLayerComponent;
  let fixture: ComponentFixture<OsmLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsmLayerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OsmLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
