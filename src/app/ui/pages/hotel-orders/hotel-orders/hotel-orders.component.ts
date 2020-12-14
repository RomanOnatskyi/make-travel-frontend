import { Component, OnInit } from '@angular/core';
import { HotelOrdersService } from '../hotel-orders.service';
import { HotelOrder } from '../../../../responses/hotel-orders-response';
import { OrderStatus, ServiceCategory } from '../../../../app-state.service';

@Component({
    selector: 'app-hotel-orders',
    templateUrl: './hotel-orders.component.html',
    styleUrls: ['./hotel-orders.component.css'],
})
export class HotelOrdersComponent implements OnInit {

    constructor(
        private hotelOrdersService: HotelOrdersService,
    ) {}

    async ngOnInit() {

        this.hotelOrders = await this.getHotelOrders();
    }

    hotelOrders: HotelOrder[];

    statuses = {
        [OrderStatus.Registered]: "Зарегистрирован",
        [OrderStatus.Accepted]: "Принят",
        [OrderStatus.Finished]: "Завершен",
        [OrderStatus.Declined]: "Отменен",
    };

    categories = {
        [ServiceCategory.Cleaning]: "Уборка",
        [ServiceCategory.Food]: "Еда",
        [ServiceCategory.Entertainment]: "Развлечения",
        [ServiceCategory.Repairing]: "Ремонт",
    };

    private async getHotelOrders() {

        const ordersResponse = await this.hotelOrdersService.getHotelOrders().toPromise();

        const error = [ ordersResponse.errors ];

        this.showError(error);

        return ordersResponse.hotelList;
    }

    private showError(errors: string[]) {

        for (let i = 0; i < errors.length; i++) {
            if (errors[i]) {
                alert(errors[i]);
            }
        }
    }
}
