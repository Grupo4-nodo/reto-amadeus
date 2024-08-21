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
    console.log(this.cities);
  }
  
  @Output() sendCity = new EventEmitter<string>();
  sendQuestions(city:string) {
    this.sendCity.emit(city);
    this.citiesService.citySend = city;
    this.router.navigate(['']);
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

  /* userPoints = this.dataUser.points;
  cityPoints = this.cities.Points;
  
  buyCity(id:number){
    console.log(this.userPoints)
    console.log(this.cityPoints)
    if(this.userPoints >= this.cityPoints){
      this.cities.Points = 0
      this.citiesService.updateCity(id, this.cityPoints).subscribe({
        next: (response) => {
          console.log(response)
        }
      })
    }
  } */
}
