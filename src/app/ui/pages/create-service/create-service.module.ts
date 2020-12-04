import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateServiceComponent } from './create-service/create-service.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [CreateServiceComponent],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class CreateServiceModule {
}
