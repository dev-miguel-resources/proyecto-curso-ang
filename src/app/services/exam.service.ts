import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Exam } from '../models/dtos/exam';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService extends GenericService<Exam> {
  private examChange: Subject<Exam[]> = new Subject<Exam[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/exams`);
  }

  // SERVICIOS DE RXJS
  setExamChange(data: Exam[]): void {
    this.examChange.next(data);
  }

  getExamChange() {
    return this.examChange.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
}
