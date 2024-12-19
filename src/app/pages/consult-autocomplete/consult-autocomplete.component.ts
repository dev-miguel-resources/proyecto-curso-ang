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
import { switchMap, Observable, map } from 'rxjs';
import * as moment from 'moment';

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
  medics: Medic[];
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

    // cargar la información de las listas de info.
    this.loadInitialData();
  }

  loadInitialData() {
    this.patients$ = this.patientService.findAll();
    this.medicService.findAll().subscribe((data) => (this.medics = data));
    this.specialtyService
      .findAll()
      .subscribe((data) => (this.specialties = data));
    this.examService.findAll().subscribe((data) => (this.exams = data));
    this.medicsFiltered$ = this.medicControl.valueChanges.pipe(
      map((val) => this.filterMedics(val))
    );
  }

  filterMedics(val: any) {
    // si tenemos un objeto medic
    if (val?.idMedic > 0) {
      // formato de lista
      return this.medics.filter(
        (el) =>
          el.primaryName
            .toLowerCase()
            .includes(val.primaryName.toLowerCase()) ||
          el.surname.toLowerCase().includes(val.surname.toLowerCase()) ||
          el.codMedic.includes(val.codMedic)
      );
    } else {
      // como cadena
      return this.medics.filter(
        (el) =>
          el.primaryName.toLowerCase().includes(val?.toLowerCase()) ||
          el.surname.toLowerCase().includes(val?.toLowerCase()) ||
          el.codMedic.includes(val?.codMedic)
      );
    }
  }

  showMedic(val: any) {
    return val ? `${val.primaryName} ${val.surname}` : val;
  }

  // agregarle la información del detalle de la consulta
  addDetail() {
    const det = new ConsultDetail();
    det.diagnosis = this.form.value['diagnosis'];
    det.treatment = this.form.value['treatment'];

    this.details.push(det);
  }

  // remover un detalle de la consulta
  removeDetail(index: number) {
    this.details.splice(index, 1);
  }

  // agregar un examen
  addExam() {
    if (this.form.value['exam'] != null) {
      this.examsSelected.push(this.form.value['exam']);
    } else {
      this._snackBar.open('Please select an exam', 'INFO', { duration: 2000 });
    }
  }

  // guardar la consulta
  save() {
    if (this.form.invalid) {
      return;
    }
    const consult = new Consult();
    consult.patient = this.form.value['patient'];
    consult.medic = this.form.value['medic'];
    consult.specialty = this.form.value['specialty'];
    consult.details = this.form.value['details'];
    consult.numConsult = 'C1';

    // darle formato al valor capturado del form para emitirlo como necesita guardar el backend
    consult.consultDate = moment(this.form.value['consultDate']).format(
      'YYYY-MM-DDTHH:mm:ss'
    );

    // asociarle los exámenes
    const dto: ConsultListExam = {
      consult: consult,
      lstExam: this.examsSelected,
    };

    this.consultService.saveTransactional(dto).subscribe(() => {
      this._snackBar.open('CREATED!', 'INFO', { duration: 2000 });

      setTimeout(() => {
        this.cleanControls();
      }, 2000);
    });
  }

  // limpiar los campos del form
  cleanControls() {
    this.form.reset();
    this.medicControl.reset();
    this.details = [];
    this.examsSelected = [];
    this.form.patchValue({
      consultDate: new Date(),
    });
  }

  // escuchar las obtenciones de fecha
  getDate(e: any) {
    console.log(e);
  }
}
