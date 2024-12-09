import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { Specialty } from 'src/app/models/dtos/specialty';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-specialty-edit',
  standalone: true,
  templateUrl: './specialty-edit.component.html',
  styleUrls: ['./specialty-edit.component.css'],
  imports: [MaterialModule, NgIf, RouterLink, ReactiveFormsModule],
})
export class SpecialtyEditComponent implements OnInit {
  id: number;
  isEdit: boolean;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private specialtyService: SpecialtyService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      idSpecialty: new FormControl(0),
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
      this.specialtyService.findById(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idSpecialty: new FormControl(data.idSpecialty),
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
  operate() {
    if (this.form.invalid) {
      return;
    }

    const specialty = new Specialty();
    specialty.idSpecialty = this.form.value['idSpecialty'];
    specialty.name = this.form.value['name'];
    specialty.description = this.form.value['description'];

    if (this.isEdit) {
      this.specialtyService
        .update(specialty.idSpecialty, specialty)
        .subscribe(() => {
          this.specialtyService.findAll().subscribe((data) => {
            this.specialtyService.setSpecialtyChange(data);
            this.specialtyService.setMessageChange('UPDATED!');
          });
        });
    } else {
      this.specialtyService
        .save(specialty)
        .pipe(
          switchMap(() => {
            return this.specialtyService.findAll();
          })
        )
        .subscribe((data) => {
          this.specialtyService.setSpecialtyChange(data);
          this.specialtyService.setMessageChange('CREATED!');
        });
    }
    this.router.navigate(['/pages/specialty']);
  }

  get f() {
    return this.form.controls;
  }
}
