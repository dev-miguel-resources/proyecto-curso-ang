import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { MedicService } from 'src/app/services/medic.service';
import { ExamService } from 'src/app/services/exam.service';
import { ConsultService } from 'src/app/services/consult.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from 'src/app/models/dtos/patient';
import { Specialty } from 'src/app/models/dtos/specialty';
import { Medic } from 'src/app/models/dtos/medic';
import { Exam } from 'src/app/models/dtos/exam';
import { ConsultDetail } from 'src/app/models/dtos/consultDetail';
import { MatStepper } from '@angular/material/stepper';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { Consult } from 'src/app/models/dtos/consult';
import * as moment from 'moment';
import { ConsultListExam } from 'src/app/models/dtos/consultListExam';

@Component({
  selector: 'app-consult-wizard',
  standalone: true,
  templateUrl: './consult-wizard.component.html',
  styleUrls: ['./consult-wizard.component.css'],
  imports: [MaterialModule, NgFor, NgIf, ReactiveFormsModule, FlexLayoutModule],
})
export class ConsultWizardComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  patients: Patient[];
  specialties: Specialty[];
  medics: Medic[];
  exams: Exam[];
  details: ConsultDetail[] = [];
  examsSelected: Exam[] = [];
  medicSelected: Medic;
  consultsArray: number[] = [];
  minDate: Date = new Date();
  consultSelected: number;

  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private patientService: PatientService,
    private specialtyService: SpecialtyService,
    private medicService: MedicService,
    private examService: ExamService,
    private consultService: ConsultService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      patient: [new FormControl(), Validators.required],
      specialty: [new FormControl(), Validators.required],
      consultDate: [new FormControl(new Date()), Validators.required],
      exam: [new FormControl(''), Validators.required],
      diagnosis: new FormControl('', [Validators.required]),
      treatment: new FormControl('', [Validators.required]),
    });

    this.secondFormGroup = this.formBuilder.group({});

    this.loadInitialData();
  }

  // cargar la data inicial: pacientes, médicos, especialidades y exámenes
  loadInitialData() {
    this.patientService.findAll().subscribe((data) => (this.patients = data));
    this.specialtyService
      .findAll()
      .subscribe((data) => (this.specialties = data));
    this.examService.findAll().subscribe((data) => (this.exams = data));
    this.medicService.findAll().subscribe((data) => (this.medics = data));

    // disponibilizar hasta 100 consultorios
    for (let i = 1; i <= 100; i++) {
      this.consultsArray.push(i);
    }
  }
  addDetail() {
    const det = new ConsultDetail();
    det.diagnosis = this.firstFormGroup.value['diagnosis'];
    det.treatment = this.firstFormGroup.value['treatment'];

    this.details.push(det);
  }

  addExam() {
    if (this.firstFormGroup.value['exam'] != null) {
      this.examsSelected.push(this.firstFormGroup.value['exam']);
    } else {
      this._snackBar.open('Please select an exam', 'info', { duration: 2000 });
    }
  }

  selectMedic(m: Medic) {
    this.medicSelected = m;
  }

  selectConsult(n: number) {
    this.consultSelected = n;
  }

  nextManualStep() {
    if (this.consultSelected > 0) {
      // sgte. paso
      this.stepper.next();
    } else {
      this._snackBar.open('Please select an consult number', 'info', {
        duration: 2000,
      });
    }
  }

  get f() {
    return this.firstFormGroup.controls;
  }

  removeDetail(index: number) {
    this.details.splice(index, 1);
  }

  save() {
    const consult = new Consult();
    consult.patient = this.firstFormGroup.value['patient'];
    consult.medic = this.medicSelected;
    consult.specialty = this.firstFormGroup.value['specialty'];
    consult.details = this.details;
    consult.numConsult = `C${this.consultSelected}`;

    consult.consultDate = moment(
      this.firstFormGroup.value['consultDate']
    ).format('YYYY-MM-DDTHH:mm:ss');

    const dto: ConsultListExam = {
      consult: consult,
      lstExam: this.examsSelected,
    };

    this.consultService.saveTransactional(dto).subscribe((data) => {
      this._snackBar.open('CREATED', 'INFO', { duration: 2000 });
    });

    setTimeout(() => {
      this.cleanControls();
    }, 2000);
  }

  cleanControls() {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.stepper.reset();
    this.details = [];
    this.examsSelected = [];
    this.consultSelected = 0;
    this.medicSelected = null;
  }
}
