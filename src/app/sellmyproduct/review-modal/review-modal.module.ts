import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicRatingModule } from 'ionic4-rating';

import { IonicModule } from '@ionic/angular';

import { ReviewModalPage } from './review-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicRatingModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReviewModalPage]
})
export class ReviewModalPageModule {}
