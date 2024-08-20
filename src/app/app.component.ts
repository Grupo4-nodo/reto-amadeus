import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionsComponent } from './pages/questions/questions.component';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuestionsComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'reto-amadeus';
}
