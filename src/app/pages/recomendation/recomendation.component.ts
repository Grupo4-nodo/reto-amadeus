import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recomendation.component.html',
  styleUrl: './recomendation.component.scss'
})
export class RecomendationComponent {
  constructor(private router:Router){}

  public proxComp() {
    let aumentQuestion = sessionStorage.getItem('questionsIndex');
    if (aumentQuestion) {
        aumentQuestion = String(Number(aumentQuestion) + 1);
        sessionStorage.setItem('questionsIndex', aumentQuestion);
        console.log(sessionStorage);
        this.router.navigate(['/cities']);
    }
}
}

