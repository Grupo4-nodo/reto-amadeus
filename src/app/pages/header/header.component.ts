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
    if (
      typeof window !== 'undefined' &&
      typeof window.sessionStorage !== 'undefined'
    ) {
      const storedValue = window.sessionStorage.getItem('email');
      return storedValue !== null;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('email');
    this.router.navigate(['/']);
  }
}
