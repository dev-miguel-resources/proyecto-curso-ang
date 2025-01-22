import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ConsultService } from 'src/app/services/consult.service';
import { Chart, ChartType } from 'chart.js/auto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-report',
  standalone: true,
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  imports: [NgIf, MaterialModule, PdfViewerModule],
})
export class ReportComponent implements OnInit {
  chart: Chart; // propiedad sujeta a dibujar gráficos
  type: ChartType = 'line';
  lineType: ChartType = 'line';
  barType: ChartType = 'bar';
  doughnutType: ChartType = 'doughnut';
  radarType: ChartType = 'radar';
  pieType: ChartType = 'pie';
  pdfSrc: string;
  imageData: any;
  // para más adelante
  filename: string;
  selectedFiles: FileList | null = null;

  constructor(
    private consultService: ConsultService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.draw(); // dibujar el apartado con todos los gráficos

    this.consultService.readFile(1).subscribe((data) => {
      this.convertToBase64(data);
    });
  }

  convertToBase64(data: any) {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => {
      const base64 = reader.result;
      this.applySanitizer(base64);
    };
  }

  applySanitizer(base64: any) {
    this.imageData = this.sanitizer.bypassSecurityTrustResourceUrl(base64);
  }

  change(type: string) {
    switch (type) {
      case 'line':
        this.type = this.lineType;
        break;
      case 'bar':
        this.type = this.barType;
        break;
      case 'doughnut':
        this.type = this.doughnutType;
        break;
      case 'radar':
        this.type = this.radarType;
        break;
      case 'pie':
        this.type = this.pieType;
        break;
      default:
        break;
    }

    if (this.chart != null) {
      this.chart.destroy(); // destruye toda la referencia de un gráfico anterior
    }

    this.draw();
  }

  // dibujar
  draw() {
    this.consultService.callProcedureOrFunction().subscribe((data) => {
      // definición de arreglos del eje x y eje y
      const dates = data.map((x) => x.consultdate);
      const quantities = data.map((x) => x.quantity);

      //console.log(dates);
      //console.log(quantities);
      this.chart = new Chart('canvas', {
        // canvas es el id a parametrizar
        type: this.type, // recibes el tipo dinámico
        data: {
          labels: dates, // eje x
          datasets: [
            // eje y
            {
              label: 'Quantity',
              data: quantities,
              borderColor: '#3cba9f',
              fill: false, // no aplicar relleno a las lineas
              backgroundColor: [
                // esquema de colores para las barras
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderWidth: 1, // agregar un borde
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true, // visualización del eje
            },
            y: {
              display: true,
              beginAtZero: true, // empieza en 0 el eje y
            },
          },
        },
      });
    });
  }

  viewReport() {}

  downloadReport() {}

  selectFile(e: any) {}

  upload() {}
}
