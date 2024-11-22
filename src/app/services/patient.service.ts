import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Patient } from '../models/dtos/patient';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PatientService extends GenericService<Patient> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/patients`);
  }

  listPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  // SERVICIOS DE PROGRAMACIÓN REACTIVA: RXJS
}
