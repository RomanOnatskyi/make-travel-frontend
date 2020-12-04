import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './ui/pages/main/main/main.component';
import { SignUpComponent } from './ui/pages/auth/components/sign-up.component';
import { SignInComponent } from './ui/pages/auth/components/sign-in.component';
import { ServicesComponent } from './ui/pages/services/services/services.component';
import { CreateServiceComponent } from './ui/pages/create-service/create-service/create-service.component';

const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: MainComponent },
    { path: 'auth/sign-up', component: SignUpComponent },
    { path: 'auth/sign-in', component: SignInComponent },
    { path: 'services', component: ServicesComponent },
    { path: 'create-service', component: CreateServiceComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
