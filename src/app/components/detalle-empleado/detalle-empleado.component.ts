import { EmpleadosDetalleService } from './../../services/empleados-detalle.service';
import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../empleado';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  empleado: Empleado;

  constructor(
    private route: ActivatedRoute,
    private empleadosService: EmpleadosMockService,
    private empleadosDetalleService: EmpleadosDetalleService,
    private location: Location
  ) { }


  ngOnInit(): void {
    // Comprobar la ruta de petición. Si es /detalle hacer this.getEmpleado,
    // si es /nuevoEmpleado hacer un new sobre this.empleado
    this.route.url.subscribe(
      segments => segments.forEach(
        segment => {
          switch (segment.path) {

            case 'detalle':
              this.getEmpleadoFromService();
              break;

            case 'nuevoEmpleado':
              this.empleado = new Empleado();
              break;
          }
        }
      )
    );
    this.empleadosDetalleService.detallesEmpleado$.subscribe(
      empleado => this.empleado = empleado
    );
  }

  private getEmpleadoFromService(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.empleadosService.getEmpleado(id)
      .subscribe(empleado => this.empleado = empleado);
  }

  save() {
    this.empleadosDetalleService.nuevoEmpleadoCreado(this.empleado);
  }

  close(): void {
    // Cambiar por un close del componente de alguna manera
    this.location.back();
  }

}
