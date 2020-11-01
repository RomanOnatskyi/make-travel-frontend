import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './ui/pages/auth/components/sign-up.component';
import { SignInComponent } from './ui/pages/auth/components/sign-in.component';

const routes: Routes = [
    // { path: '', component: Main },
    { path: 'auth/sign-up', component: SignUpComponent },
    { path: 'auth/sign-in', component: SignInComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
