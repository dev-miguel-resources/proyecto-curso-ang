import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [MaterialModule, NgIf, RouterOutlet, RouterLink, RouterLinkActive],
})
export class LayoutComponent {
  // implementaciones pendientes para más adelante
  logout() {}
}
