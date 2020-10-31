import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './ui/pages/sign-in/sign-in/sign-in.component';

const routes: Routes = [
    // { path: '', component: Main },
    { path: 'registration', component: SignInComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
