import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderModule } from './ui/header/header.module';
import { AppRoutingModule } from './app-routing.module';
import { SignInModule } from './ui/pages/sign-in/sign-in.module';
import { FooterModule } from './ui/footer/footer.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HeaderModule,
        SignInModule,
        FooterModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
