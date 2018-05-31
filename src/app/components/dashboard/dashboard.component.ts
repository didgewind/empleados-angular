import { EmpleadosAdapterService } from './../../services/empleados-adapter.service';
import { EmpleadosDetalleService } from './../../services/empleados-detalle.service';
import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../model/empleado';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/*
 * Componente para mostrar n empleados en un dashboard
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  empleados: Empleado[];
  private index = 0;
  private empleadosAMostrar = 4;
  private btPatrasDisabled = false;
  private btPalanteDisabled = false;

  constructor(private route: ActivatedRoute,
    private empleadosService: EmpleadosAdapterService) { }

  ngOnInit() {
    this.getEmpleadosFromService();
  }

  /*
   * Recuperamos los empleados del servicio y mostramos los que correspondan
   * según el valor de this.index. Aprovechamos para corregirlo (para que
   * no sea menor que 0 ni demasiado alto) y para habilitar / deshabilitar
   * los botones de alante y atrás
   */
  private getEmpleadosFromService() {
    this.empleadosService.getAllEmpleados().subscribe(
      empleados => {
        if (this.index <= 0) {
          this.btPatrasDisabled = true;
          this.index = 0;
        } else if (this.index + this.empleadosAMostrar >= empleados.length) {
            this.btPalanteDisabled = true;
            this.index = empleados.length - this.empleadosAMostrar;
        }
        if (this.index > 0) {
          this.btPatrasDisabled = false;
        }
        if (this.index + this.empleadosAMostrar < empleados.length - 1) {
          this.btPalanteDisabled = false;
        }
        this.empleados = empleados.slice(this.index,
          this.index + this.empleadosAMostrar);
      });
  }

  onPalante(): void {
    this.index += this.empleadosAMostrar;
    this.getEmpleadosFromService();
  }

  onPatras(): void {
    this.index -= this.empleadosAMostrar;
    this.getEmpleadosFromService();
  }
}
