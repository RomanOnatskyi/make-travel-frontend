import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './ui/header/header.module';
import { FooterModule } from './ui/footer/footer.module';
import { MainModule } from './ui/pages/main/main.module';
import { AuthModule } from './ui/pages/auth/auth.module';
import { MainMenuModule } from './ui/main-menu/main-menu.module';
import { ServicesModule } from './ui/pages/services/services.module';
import { CreateServiceModule } from './ui/pages/create-service/create-service.module';
import { HotelOrdersModule } from './ui/pages/hotel-orders/hotel-orders.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HeaderModule,
        FooterModule,
        MainModule,
        AuthModule,
        MainMenuModule,
        ServicesModule,
        CreateServiceModule,
        HotelOrdersModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
