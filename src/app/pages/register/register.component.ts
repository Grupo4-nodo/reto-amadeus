import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';
import { NgIf } from '@angular/common';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, TooltipComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private usersService: UsersService, private router: Router) {}

  get formControls() {
    return this.registerForm.controls;
  }

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}'
      ),
    ]),
    age: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'
      ),
    ]),
  });

  registerUser() {
    let formData: Omit<User, 'id'> = {
      ...this.registerForm.value,
      name: this.formControls.name.value ?? '',
      lastName: this.formControls.lastName.value ?? '',
      userName: this.formControls.userName.value ?? '',
      email: this.formControls.email.value ?? '',
      age: Number(this.formControls.age.value) ?? 0,
      country: this.formControls.country.value ?? '',
      password: this.formControls.password.value ?? '',
      points: 0,
      amadeusAnswers: [],
      questionsAnswered: 0,
    };

    this.usersService.checkIfUserExits(formData.email).subscribe({
      next: (existingUser) => {
        if (existingUser.length > 0) {
          alert('El usuario ya existe');
        } else {
          this.usersService.registerUser(formData).subscribe({
            next: (res) => {
              console.log(res);
              this.registerForm.reset();
              alert('Registro exitoso');
              this.router.navigate(['/login']);
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
