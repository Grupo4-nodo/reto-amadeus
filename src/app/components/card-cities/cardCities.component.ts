import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cities } from '../../interfaces/cities.interface';
import { CitiesService } from '../../services/cities.service.ts.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-cardCities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardCities.component.html',
  styleUrl: './cardCities.component.scss'
})
export class CardCitiesComponent {

  public citiesService = inject(CitiesService);
  public cities: any;

  async ngOnInit() {
    this.cities = await lastValueFrom(this.citiesService.getCities());
  }
}
