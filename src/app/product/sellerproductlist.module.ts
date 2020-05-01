import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SellerproductlistPage } from './sellerproductlist.page';

const routes: Routes = [
  {
    path: '',
    component: SellerproductlistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SellerproductlistPage]
})
export class SellerproductlistPageModule { }
