import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MedicService } from 'src/app/services/medic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Medic } from 'src/app/models/dtos/medic';
import { switchMap } from 'rxjs';
import { MedicDialogComponent } from './medic-dialog/medic-dialog.component';

@Component({
  selector: 'app-medic',
  standalone: true,
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css'],
  imports: [MaterialModule],
})
export class MedicComponent {
  dataSource: MatTableDataSource<Medic>;
  displayedColumns: string[] = [
    'idMedic',
    'primaryName',
    'surname',
    'codMed',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private medicService: MedicService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.medicService.findAll().subscribe((data) => {
      this.createTable(data);
    });

    this.medicService.getMedicChange().subscribe((data) => {
      this.createTable(data);
    });

    this.medicService.getMessageChange().subscribe((data) => {
      this._snackBar.open(data, 'INFO', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    });
  }
  createTable(data: Medic[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(medic?: Medic) {
    this._dialog.open(MedicDialogComponent, {
      width: '350px',
      data: medic,
      disableClose: true,
    });
  }

  delete(id: number) {
    this.medicService
      .delete(id)
      .pipe(switchMap(() => this.medicService.findAll()))
      .subscribe((data) => {
        this.medicService.setMedicChange(data);
        this.medicService.setMessageChange('DELETED!');
      });
  }
}
