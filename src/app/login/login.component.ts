import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import '../../assets/login-animation.js';
import { NgIf } from '@angular/common';
import { MaterialModule } from '../material/material.module';

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

  constructor() {}

  login() {}

  ngAfterViewInit(): void {
    (window as any).initialize();
  }
}
