import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';
import { NgIf } from '@angular/common';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, TooltipComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private usersService: UsersService, private router: Router) {}

  get formControls() {
    return this.loginForm.controls;
  }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}'
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'
      ),
    ]),
  });

  loginUser() {
    let formData = {
      email: this.formControls.email.value ?? '',
      password: this.formControls.password.value ?? '',
    };

    this.usersService.checkIfUserExits(formData.email).subscribe((response) => {
      if (response.length > 0 && response[0].password === formData.password) {
        sessionStorage.setItem('email', formData.email as string);
        this.router.navigate(['']);
      } else {
        alert('Credenciales incorrectas');
      }
    });
  }
}
