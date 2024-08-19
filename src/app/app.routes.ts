import { Routes } from '@angular/router';
import { AmadeusQuestionComponent } from './pages/amadeus-question/amadeus-question.component';
import { HomeComponent } from './pages/home/home.component';
import { CitiesComponent } from './pages/cities/cities.component';

export const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'cities', component:CitiesComponent},
  {path: 'amadeus-questions', component:AmadeusQuestionComponent}
];
