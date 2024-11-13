import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';

// definimos las rutas internas de la application
export const PagesRoutes: Routes = [
  {
    path: 'patient',
    component: PatientComponent,
  },
];
