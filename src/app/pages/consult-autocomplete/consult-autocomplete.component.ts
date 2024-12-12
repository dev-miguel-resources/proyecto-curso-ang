import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Consult } from 'src/app/models/dtos/consult';
import { ConsultDetail } from 'src/app/models/dtos/consultDetail';
import { ConsultListExam } from 'src/app/models/dtos/consultListExam';
import { Exam } from 'src/app/models/dtos/exam';
import { Medic } from 'src/app/models/dtos/medic';
import { Patient } from 'src/app/models/dtos/patient';
import { Specialty } from 'src/app/models/dtos/specialty';
import { ConsultService } from 'src/app/services/consult.service';
import { ExamService } from 'src/app/services/exam.service';
import { MedicService } from 'src/app/services/medic.service';
import { PatientService } from 'src/app/services/patient.service';
import { SpecialtyService } from './../../services/specialty.service';
import { switchMap, Observable } from 'rxjs';

@Component({
  selector: 'app-consult-autocomplete',
  standalone: true,
  templateUrl: './consult-autocomplete.component.html',
  styleUrls: ['./consult-autocomplete.component.css'],
  imports: [MaterialModule, ReactiveFormsModule, NgFor, AsyncPipe],
})
export class ConsultAutocompleteComponent implements OnInit {
  // atributos
  form: FormGroup;
  patients$: Observable<Patient[]>;
  medicsFiltered$: Observable<Medic[]>;
  specialties: Specialty[];
  details: ConsultDetail[] = [];
  exams: Exam[];
  examsSelected: Exam[] = [];
  medicControl: FormControl = new FormControl('', [Validators.required]);
  minDate: Date = new Date();

  constructor(
    private patientService: PatientService,
    private medicService: MedicService,
    private specialtyService: SpecialtyService,
    private examService: ExamService,
    private consultService: ConsultService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      patient: new FormControl([Validators.required]),
      medic: this.medicControl,
      specialty: new FormControl([Validators.required]),
      consultDate: new FormControl(new Date(), [Validators.required]),
      diagnosis: new FormControl('', [Validators.required]),
      treatment: new FormControl('', [Validators.required]),
      exam: new FormControl(),
    });
  }
  addExam() {}

  addDetail() {}

  removeDetail(idDetail: number) {}

  getDate(e: any) {}

  save() {}

  showMedic(val: any) {
    return val;
  }
}
