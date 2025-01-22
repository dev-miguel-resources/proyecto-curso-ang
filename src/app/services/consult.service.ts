import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Consult } from '../models/dtos/consult';
import { FilterConsult } from '../models/dtos/filterConsult';
import { ConsultListExam } from '../models/dtos/consultListExam';

@Injectable({
  providedIn: 'root',
})
export class ConsultService {
  private url: string = `${environment.HOST}/consults`;

  constructor(private http: HttpClient) {}

  searchByDates(date1: string, date2: string) {
    return this.http.get<Consult[]>(
      `${this.url}/search/dates?date1=${date1}&date2=${date2}`
    );
  }

  searchByOthers(dto: FilterConsult) {
    return this.http.post<Consult[]>(`${this.url}/search/others`, dto);
  }

  saveTransactional(dto: ConsultListExam) {
    return this.http.post(this.url, dto);
  }

  getExamsByIdConsult(idConsult: number) {
    return this.http.get(`${environment.HOST}/consultexams/${idConsult}`);
  }

  callProcedureOrFunction() {
    return this.http.get<any>(`${this.url}/callProcedureNative`);
  }

  // blob: es un tipo especifico para procesamiento óptimo de archivos en binario: imágenes, pdfs, excel, etc...
  generateReport() {
    return this.http.get(`${this.url}/generateReport`, {
      responseType: 'blob', // binary
    });
  }

  // Files, images
  saveFile(data: File) {
    const formData: FormData = new FormData();
    formData.append('file', data);

    return this.http.post(`${this.url}/saveFile`, formData);
  }

  readFile(id: number) {
    return this.http.get(`${this.url}/readFile/${id}`, {
      responseType: 'blob',
    });
  }
}
