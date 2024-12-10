import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exam } from 'src/app/models/dtos/exam';
import { ExamService } from 'src/app/services/exam.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exam',
  standalone: true,
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
  imports: [MaterialModule, RouterLink, RouterOutlet],
})
export class ExamComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<Exam>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private examService: ExamService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.examService.findAll().subscribe((data) => {
      this.createTable(data);
    });

    this.examService.getExamChange().subscribe((data) => {
      this.createTable(data);
    });

    this.examService.getMessageChange().subscribe((data) => {
      this._snackBar.open(data, 'INFO', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    });
  }

  createTable(exams: Exam[]) {
    this.dataSource = new MatTableDataSource(exams);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(idExam: number) {
    this.examService
      .delete(idExam)
      .pipe(
        switchMap(() => {
          return this.examService.findAll();
        })
      )
      .subscribe((data) => {
        this.examService.setExamChange(data);
        this.examService.setMessageChange('DELETED!');
      });
  }
}
