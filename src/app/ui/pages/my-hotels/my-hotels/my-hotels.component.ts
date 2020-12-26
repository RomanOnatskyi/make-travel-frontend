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
    feedback: Feedback;

    async ngOnInit() {

        this.userHotels = await this.getUserHotels();
    }

    private async getUserHotels() {

        const userHotelsResponse = await this.myHotelsService.getUserHotels().toPromise();

        const error = [ userHotelsResponse.errors ];

        this.showError(error);

        return userHotelsResponse.hotelList;
    }

    private leaveFeedback(hotelId: number) {

        // todo связать форму с объектом фидбэка

        this.feedback.hotelId = hotelId;

        this.myHotelsService.sendFeedback(this.feedback)
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
