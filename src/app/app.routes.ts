import { Routes } from '@angular/router';
import { CitiesComponent } from './pages/cities/cities.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'cities', component:CitiesComponent}
];
