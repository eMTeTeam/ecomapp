import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReviewsService } from 'src/app/service/reviews.service';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.page.html',
  styleUrls: ['./review-modal.page.scss'],
})
export class ReviewModalPage implements OnInit {

  comments: any;
  rating: any;
  sellerreviewtags:any;
  searchList: any;
  tags: any;
  rate:any;
  constructor(
    public modalController: ModalController,
    private ReviewsService: ReviewsService
  ) { }

  ngOnInit() {
    this.searchList=this.sellerreviewtags;
  }
  done() {
    this.rating = this.tags + ',' + this.rating;
    this.modalController.dismiss(this.comments, this.rating);
  }

  onRateChange(event) {
    this.rating = event;
    this.allSellerreviewtags();
    console.log('Your rate:', event);
  }
  tagId(event) {
    this.tags = event.id;
    
    console.log('Your Id:', this.tags);
  }
  allSellerreviewtags() {

    this.ReviewsService.sellerReviewtags().subscribe(
      data => {
        this.sellerreviewtags = data;
        this.searchList=this.sellerreviewtags;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
