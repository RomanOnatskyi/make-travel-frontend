import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService, ServiceCategory } from '../../../../app-state.service';
import { NewHotelService } from '../new-hotel-service';
import { CreateServiceService } from '../create-service.service';
import { BaseResponse } from '../../../../responses/base-response';

@Component({
    selector: 'app-create-service',
    templateUrl: './create-service.component.html',
    styleUrls: ['./create-service.component.css'],
})
export class CreateServiceComponent implements OnInit {

    constructor(
        private router: Router,
        private appStateService: AppStateService,
        private createServiceService: CreateServiceService,
    ) {}

    ngOnInit() {

        this.newHotelService.category = ServiceCategory.Cleaning;
    }

    categories = [
        { name: "Уборка", value: ServiceCategory.Cleaning },
        { name: "Еда", value: ServiceCategory.Food },
        { name: "Развлечения", value: ServiceCategory.Entertainment },
        { name: "Ремонт", value: ServiceCategory.Repairing },
    ];

    newHotelService = new NewHotelService();
    processing: boolean = false;
    serviceCreationError: string = null;

    submit() {

        this.processing = true;

        this.createServiceService.createService(this.newHotelService)
            .subscribe(response => this.handleResponse(response));
    }

    private handleResponse(response: BaseResponse) {

        this.processing = false;
        this.serviceCreationError = response.errors;

        if (this.serviceCreationError) {
            window.scrollTo(0, 0);
            return;
        }

        alert('Услуга успешно создана!');
    }

}
