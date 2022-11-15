import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DeclaracionService } from './core/services/declaracion/declaracion.service'
import { VehiculoService } from './core/services/vehiculo/vehiculo.service';
import { AvaluoService } from './core/services/avaluo/avaluo.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'reto-front';

  declaracionForm !: FormGroup;
  vehiculos: any;
  declaracion: any;
  avaluo: any;
  public opcion: any;

  constructor(
    public fb: FormBuilder,
    public declaracionService: DeclaracionService,
    public vehiculoService: VehiculoService,
    public avaluoService: AvaluoService
  ) {

  }
  ngOnInit(): void {
    this.declaracionForm = this.fb.group({
      vehiculo_placa: ['', Validators.required],
    });

    this.vehiculoService.listvehiculos().subscribe(resp => {
      this.vehiculos = resp;
    },
      error => { console.error(error) }
    );
  }

  crearDeclaracion(): void {
    this.declaracionService.nuevaDeclaracion(this.declaracionForm.value).subscribe(resp => {
      this.declaracion = resp;
      this.declaracionForm.reset();
      this.Avaluo();
    },
      error => { console.error(error) });

  }

  Avaluo(): void {
    this.avaluoService.getAvaluo(this.declaracion.vehiculoResponse.claseResponse.id_clase, this.declaracion.vehiculoResponse.modelo,
      this.declaracion.vehiculoResponse.cilindraje, this.declaracion.vehiculoResponse.lineaResponse.id_linea).subscribe(resp => {
        this.avaluo = resp;
        this.opcion=0;
      },
        error => { console.error(error) });
  }

  public downloadPDF(): void {
    // Extraemos el
    const DATA: any = document.getElementById('htmlData');
    console.log(DATA);
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`_tutorial.pdf`);
    }).catch(error => console.log(error));
  }


}
