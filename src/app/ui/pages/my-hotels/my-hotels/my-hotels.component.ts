import * as E from "linq";
import { Component, OnInit } from '@angular/core';
import { UserHotel } from '../../../../responses/user-hotel-response';
import { Feedback } from '../feedback';
import { MyHotelsService } from '../my-hotels.service';

@Component({
    selector: 'app-my-hotels',
    templateUrl: './my-hotels.component.html',
    styleUrls: ['./my-hotels.component.css'],
})
export class MyHotelsComponent implements OnInit {

    constructor(
        private myHotelsService: MyHotelsService,
    ) {}

    userHotels: UserHotel[];

    async ngOnInit() {

        this.userHotels = await this.getUserHotels();
        E.from(this.userHotels)
            .forEach(i => {

                i.feedback = new Feedback();
            });
    }

    private async getUserHotels() {

        const userHotelsResponse = await this.myHotelsService.getUserHotels().toPromise();

        const error = [ userHotelsResponse.errors ];

        this.showError(error);

        return userHotelsResponse.hotelList;
    }

    leaveFeedback(hotel: UserHotel) {

        hotel.feedback.hotelId = hotel.id;

        this.myHotelsService.sendFeedback(hotel.feedback)
            .subscribe(response => this.showError([ response.errors ]));

        alert("Ваш отзыв принят");
    }

    private showError(errors: string[]) {

        for (let i = 0; i < errors.length; i++) {
            if (errors[i]) {
                alert(errors[i]);
            }
        }
    }
}
