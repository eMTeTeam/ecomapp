import { Component, OnInit, Input } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.page.html',
  styleUrls: ['./review-modal.page.scss'],
})
export class ReviewModalPage implements OnInit {

  comments: any;
  rating: any;
  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }
  done() {
    this.modalController.dismiss(this.comments,this.rating);
  }

  onRateChange(event) {
    this.rating =event;
    console.log('Your rate:', event);
  }
}
