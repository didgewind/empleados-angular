import { EmpleadosDetalleService } from './../../services/empleados-detalle.service';
import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../empleado';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private empleadosService: EmpleadosMockService,
    private empleadosDetalleService: EmpleadosDetalleService) { }

  ngOnInit() {
    this.getEmpleadosFromService();
  }

  getEmpleadosFromService() {
    this.empleadosService.getAllEmpleados()
    .subscribe(empleados => {
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
