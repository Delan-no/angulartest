import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  // login() {
  //   this.authService.login(this.credentials)
  //    .subscribe(() => {
  //       this.router.navigate(['/first']);
  //     });
  // }

  login() {
    this.authService.login(this.credentials).subscribe(
      () => {
        this.router.navigate(['/first']);
      },
      (error) => {
        console.error('Erreur lors de la connexion', error);
        // Vous pouvez afficher un message d'erreur à l'utilisateur ici
      }
    );
  }
}
