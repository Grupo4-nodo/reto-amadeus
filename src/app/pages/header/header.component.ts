import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  isLogged(): boolean {
    return !!sessionStorage.getItem('email');
  }

  logout() {
    sessionStorage.removeItem('email');
    this.router.navigate(['/']);
  }
}
