import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf, TooltipComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  get name() {
    return this.registerForm.get('name') as FormControl;
  }
  get lastName() {
    return this.registerForm.get('lastName') as FormControl;
  }
  get userName() {
    return this.registerForm.get('userName') as FormControl;
  }
  get email() {
    return this.registerForm.get('email') as FormControl;
  }
  get age() {
    return this.registerForm.get('age') as FormControl;
  }
  get country() {
    return this.registerForm.get('country') as FormControl;
  }
  get password() {
    return this.registerForm.get('password') as FormControl;
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
}
