import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Specialty } from '../models/dtos/specialty';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService extends GenericService<Specialty> {
  private SpecialtyChange: Subject<Specialty[]> = new Subject<Specialty[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/specialtys`);
  }

  // SERVICIOS DE RXJS
  setSpecialtyChange(data: Specialty[]) {
    this.SpecialtyChange.next(data);
  }

  getSpecialtyChange() {
    return this.SpecialtyChange.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
}
