import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UsersService } from '../../services/users.service';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public userService = inject(UsersService)
  public citiesService = inject(CitiesService) //Consumir servicio CitiesService
  private router = inject(Router);

  public activeUser:any = sessionStorage.getItem('email');

  checkUser (){
    if(this.activeUser) {
      this.router.navigate(['/cities']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
