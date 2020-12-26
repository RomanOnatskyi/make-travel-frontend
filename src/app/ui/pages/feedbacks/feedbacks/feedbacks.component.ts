import { Component, OnInit } from '@angular/core';
import { FeedbacksService } from '../feedbacks.service';
import { UserHotel } from '../../../../responses/user-hotel-response';
import { HotelFeedback } from '../../../../responses/hotel-feedbacks-response';

@Component({
    selector: 'app-feedbacks',
    templateUrl: './feedbacks.component.html',
    styleUrls: ['./feedbacks.component.css'],
})
export class FeedbacksComponent implements OnInit {

    constructor(
        private feedbacksService: FeedbacksService,
    ) {}

    hotels: UserHotel[];
    hotelFeedbacks: HotelFeedback[];

    currentHotelId: number;

    async ngOnInit() {

        this.hotels = await this.getHotels();
        this.hotelFeedbacks = await this.getFeedbacks(this.hotels[0].id);
    }

    async hotelSelected(hotelId: number) {

        this.hotelFeedbacks = await this.getFeedbacks(hotelId);
    }

    private async getHotels() {

        const hotelsResponse = await this.feedbacksService.getAllHotels().toPromise();

        const error = [ hotelsResponse.errors ];

        this.showError(error);

        return hotelsResponse.hotelList;
    }

    private async getFeedbacks(hotelId: number) {

        this.currentHotelId = hotelId;

        const hotelFeedbacksResponse = await this.feedbacksService.getFeedbacksByHotelId(hotelId).toPromise();

        const error = [ hotelFeedbacksResponse.errors ];

        this.showError(error);

        return hotelFeedbacksResponse.feedbackList;
    }

    private showError(errors: string[]) {

        for (let i = 0; i < errors.length; i++) {
            if (errors[i]) {
                alert(errors[i]);
            }
        }
    }
}
