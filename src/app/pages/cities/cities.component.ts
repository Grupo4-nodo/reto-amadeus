import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../components/title/title.component';
import { CardComponent } from '../../components/card/card.component';
import { CardCitiesComponent } from '../../components/card-cities/cardCities.component';
import { Cities } from '../../interfaces/cities.interface';
import { CitiesService } from '../../services/cities.service.ts.service';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    CardComponent,
    CardCitiesComponent
  ],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})

export class CitiesComponent {
  constructor(public citiesService: CitiesService) {}

}
