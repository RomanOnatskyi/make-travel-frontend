import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderModule } from './ui/header/header.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './ui/pages/auth/auth.module';
import { FooterModule } from './ui/footer/footer.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HeaderModule,
        AuthModule,
        FooterModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
