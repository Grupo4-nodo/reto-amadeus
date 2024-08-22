import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  constructor(private usersService: UsersService) {}
  public dataUser: any;

  ngOnInit() {
    const email = sessionStorage.getItem('email');
    if (email) {
      this.usersService.checkIfUserExits(email).subscribe({
        next: (response) => {
          this.dataUser = response[0];
          console.log(response);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
