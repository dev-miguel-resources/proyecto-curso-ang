import { NgIf } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { Exam } from 'src/app/models/dtos/exam';
import { ExamService } from 'src/app/services/exam.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-exam-edit',
  standalone: true,
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.css'],
  imports: [MaterialModule, NgIf, RouterLink, ReactiveFormsModule],
})
export class ExamEditComponent implements OnInit {
  id: number;
  isEdit: boolean;
  form: FormGroup;

  constructor(
    private router: Router,
    private examService: ExamService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      idExam: new FormControl(0),
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      this.initForm();
    });
  }
  initForm() {
    if (this.isEdit) {
      this.examService.findById(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idExam: new FormControl(data.idExam),
          name: new FormControl(data.name, [
            Validators.required,
            Validators.minLength(3),
          ]),
          description: new FormControl(data.description, [
            Validators.required,
            Validators.minLength(3),
          ]),
        });
      });
    }
  }

  get f() {
    return this.form.controls;
  }
  operate() {
    if (this.form.invalid) {
      return;
    }

    let exam = new Exam();
    exam.idExam = this.form.value['idExam'];
    exam.name = this.form.value['name'];
    exam.description = this.form.value['description'];

    if (this.isEdit) {
      this.examService.update(exam.idExam, exam).subscribe(() => {
        this.examService.findAll().subscribe((data) => {
          this.examService.setExamChange(data);
          this.examService.setMessageChange('UPDATED!');
        });
      });
    } else {
      this.examService
        .save(exam)
        .pipe(
          switchMap(() => {
            return this.examService.findAll();
          })
        )
        .subscribe((data) => {
          this.examService.setExamChange(data);
          this.examService.setMessageChange('CREATED!');
        });
    }

    this.router.navigate(['/pages/exam']);
  }
}
