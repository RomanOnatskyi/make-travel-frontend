import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthContentComponent } from './content/auth-content.component';
import { SignUpComponent } from './sign-up.component';
import { SignInComponent } from './sign-in.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
    ],
    declarations: [
        AuthContentComponent,
        SignUpComponent,
        SignInComponent,
    ],
})
export class AuthModule {}
