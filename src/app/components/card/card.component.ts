import { Component, inject, Input } from '@angular/core';
import { CitiesService } from '../../services/cities.service.ts.service';
import { Cities } from '../../interfaces/cities.interface';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  public citiesService = inject(CitiesService);
  private router = inject(Router)

  @Input()
  gettingCities() {
    this.citiesService.getCities().subscribe({
      next: (data) => {
        //console.log(data);
        const cities = data as Cities;
        //console.log(cities);
        this.router.navigate(['/cities'])
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
