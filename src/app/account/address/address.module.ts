import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OsmLayerComponent } from './osm-layer/osm-layer.component';
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { AddressPage } from './address.page';

const routes: Routes = [
  {
    path: '',
    component: AddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    OsmLayerComponent
  ],
  providers: [GooglePlus],
  declarations: [AddressPage, OsmLayerComponent]
})
export class AddressPageModule { }
