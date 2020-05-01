import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SellmyproductlistPage } from './sellmyproductlist.page';

const routes: Routes = [
  {
    path: '',
    component: SellmyproductlistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SellmyproductlistPage]
})
export class SellmyproductlistPageModule {}
