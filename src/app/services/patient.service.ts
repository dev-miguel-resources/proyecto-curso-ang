import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Patient } from '../models/dtos/patient';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService extends GenericService<Patient> {
  private patientChange: Subject<Patient[]> = new Subject<Patient[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/patients`);
  }

  listPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  // SERVICIOS DE PROGRAMACIÓN REACTIVA: RXJS
  setPatientChange(data: Patient[]) {
    this.patientChange.next(data); // next: disponibiliza el evento con la data
  }

  getPatientChange() {
    return this.patientChange.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
}
