import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './ui/header/header.module';
import { FooterModule } from './ui/footer/footer.module';
import { MainModule } from './ui/pages/main/main.module';
import { AuthModule } from './ui/pages/auth/auth.module';
import { ServicesModule } from './ui/pages/services/services.module';

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
        ServicesModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
