import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

import { CitiesService } from '../../services/cities.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})

export class CitiesComponent {
  private router = inject(Router);
  public citiesService = inject(CitiesService);
  public usersService = inject(UsersService);
  public dataUser: any = {};

  @Input() cities:any = []
  async ngOnInit() {
    this.cities = await lastValueFrom(this.citiesService.getCities());
  }
  
  @Output() sendCity = new EventEmitter<string>();
  sendQuestions(city:string) {
    this.sendCity.emit(city);
    this.citiesService.citySend = city;
    this.router.navigate(['/questions']);
  }
  
  @Input()
  getUsers() {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.dataUser = data;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
