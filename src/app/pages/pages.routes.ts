import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { PatientEditComponent } from './patient/patient-edit/patient-edit.component';
import { MedicComponent } from './medic/medic.component';
import { SpecialtyComponent } from './specialty/specialty.component';
import { SpecialtyEditComponent } from './specialty/specialty-edit/specialty-edit.component';

// definimos las rutas internas de la application
export const PagesRoutes: Routes = [
  {
    path: 'patient',
    component: PatientComponent,
    children: [
      {
        path: 'new',
        component: PatientEditComponent,
      },
      {
        path: 'edit/:id',
        component: PatientEditComponent,
      },
    ],
  },
  {
    path: 'medic',
    component: MedicComponent,
  },
  {
    path: 'specialty',
    component: SpecialtyComponent,
    children: [
      {
        path: 'new',
        component: SpecialtyEditComponent,
      },
      {
        path: 'edit/:id',
        component: SpecialtyEditComponent,
      },
    ],
  },
];
