import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AmadeusQuestionComponent } from './pages/amadeus-question/amadeus-question.component';
import { HomeComponent } from './pages/home/home.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { QuestionsComponent } from './pages/questions/questions.component';

export const routes: Routes = [
  { path: '', component:HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'amadeus-questions', component: AmadeusQuestionComponent },
  {path: '', component:HomeComponent},
  {path: 'cities', component:CitiesComponent},
  {path: 'questions', component:QuestionsComponent}
];
