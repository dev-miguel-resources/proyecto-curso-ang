import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Specialty } from 'src/app/models/dtos/specialty';
import { SpecialtyService } from 'src/app/services/specialty.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-specialty',
  standalone: true,
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css'],
  imports: [MaterialModule, RouterLink, RouterOutlet],
})
export class SpecialtyComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<Specialty>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private specialtyService: SpecialtyService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.specialtyService.findAll().subscribe((data) => {
      this.createTable(data);
    });

    // habilitamos los update
    this.specialtyService.getSpecialtyChange().subscribe((data) => {
      this.createTable(data);
    });

    this.specialtyService.getMessageChange().subscribe((data) => {
      this._snackBar.open(data, 'INFO', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    });
  }

  createTable(specialtys: Specialty[]) {
    this.dataSource = new MatTableDataSource(specialtys);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(idSpecialty: number) {
    this.specialtyService
      .delete(idSpecialty)
      .pipe(
        switchMap(() => {
          return this.specialtyService.findAll();
        })
      )
      .subscribe((data) => {
        this.specialtyService.setSpecialtyChange(data);
        this.specialtyService.setMessageChange('DELETED!');
      });
  }

  checkChildren(): boolean {
    return this.route.children.length > 0;
  }
}
