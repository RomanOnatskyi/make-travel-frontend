import { Component, OnInit } from '@angular/core';
import { HotelOrdersService } from '../hotel-orders.service';
import { HotelOrder } from '../../../../responses/hotel-orders-response';

@Component({
    selector: 'app-hotel-orders',
    templateUrl: './hotel-orders.component.html',
    styleUrls: ['./hotel-orders.component.css'],
})
export class HotelOrdersComponent implements OnInit {

    constructor(
        private hotelOrdersService: HotelOrdersService,
    ) {}

    ngOnInit(): void {

        this.hotelOrders = this.getHotelOrders();
    }

    hotelOrders: HotelOrder[];

    private getHotelOrders() {

        let orders = [];

        this.hotelOrdersService.getHotelOrders()
            .subscribe(response => {

                this.showError([response.errors]);

                orders = response.hotelList;
            });

        return orders;
    }

    private showError(errors: string[]) {

        for (let i = 0; i < errors.length; i++) {
            if (errors[i]) {
                alert(errors[i]);
            }
        }
    }
}
