import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
    {path:'', redirectTo:"/login", pathMatch:'full' },
    {path:'products', component: DashboardComponent, canActivate:[
        authGuard
    ]},
    {path:'products/edit/:id', component: ProductComponent, canActivate:[
        authGuard
    ]},
    {path:'login', component: LoginComponent},
    {path:'**', component: NotFoundComponent},
    
];
