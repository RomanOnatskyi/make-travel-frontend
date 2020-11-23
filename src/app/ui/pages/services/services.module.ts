import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services/services.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [ServicesComponent],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class ServicesModule {
}
