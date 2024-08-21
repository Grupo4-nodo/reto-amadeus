import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AmadeusQuestionComponent } from './pages/amadeus-question/amadeus-question.component';
import { HomeComponent } from './pages/home/home.component';
import { CitiesComponent } from './pages/cities/cities.component';

export const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'amadeus-questions', component: AmadeusQuestionComponent },
  { path: 'cities', component:CitiesComponent }
];
