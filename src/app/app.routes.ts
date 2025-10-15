import { RegisterComponentComponent } from './register-component/register-component.component';
import { Routes } from '@angular/router';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: AppComponent },
];
