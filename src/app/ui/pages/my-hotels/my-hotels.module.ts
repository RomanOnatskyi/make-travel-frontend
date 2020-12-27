import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyHotelsComponent } from './my-hotels/my-hotels.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [MyHotelsComponent],
    imports: [
        CommonModule,
        FormsModule,
    ],
})
export class MyHotelsModule {
}
