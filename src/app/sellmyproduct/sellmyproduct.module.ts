import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicSelectableModule } from 'ionic-selectable';
import { SellmyproductPage } from './sellmyproduct.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IonicSelectableModule,
        RouterModule.forChild([
            {
                path: '',
                component: SellmyproductPage
            }
        ])
    ],
    declarations: [SellmyproductPage]
})
export class SellmyproductPageModule { }
