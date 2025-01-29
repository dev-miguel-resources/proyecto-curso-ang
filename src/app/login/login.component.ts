import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import '../../assets/login-animation.js';
import { NgIf } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, NgIf, MaterialModule],
})
export class LoginComponent {
  username: string;
  password: string;
  message: string;
  error: string;
  userDomain: string = 'user@domain.com';

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe((data) => {
      sessionStorage.setItem(environment.TOKEN_NAME, data.jwtToken);
      //this.router.navigate(['pages/patient']);
      this.router.navigate(['pages/dashboard']);
    });
  }

  ngAfterViewInit(): void {
    (window as any).initialize();
  }
}
