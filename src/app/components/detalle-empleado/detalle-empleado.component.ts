import { EmpleadosAdapterService } from './../../services/empleados-adapter.service';
import { EmpleadosDetalleService } from './../../services/empleados-detalle.service';
import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../model/empleado';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

/*
 * Componente que muestra los detalles de un empleado. El empleado a mostrar
 * lo obtendrá bien directamente del servicio (si estamos mostrando una
 * nueva instancia del componente) o a través del servicio de comunicación
 * (si ya estamos mostrando el componente y seleccionamos un empleado nuevo
 * en la lista o en el dashboard)
 */
@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  empleado: Empleado;

  constructor(
    private route: ActivatedRoute,
    private empleadosService: EmpleadosAdapterService,
    private empleadosDetalleService: EmpleadosDetalleService,
    private router: Router
  ) { }


  ngOnInit(): void {
    // Comprobar la ruta de petición. Si es /detalle hacer this.getEmpleado,
    // si es /nuevoEmpleado hacer un new sobre this.empleado
    // Al subscribirnos a la url el callback es invocado cuando ésta cambia,
    // por lo que ahora sí se actualiza el empleado a mostrar aunque
    // el componente no se redibuje, por lo que podemos prescindir del
    // Observable de notificación de nueva selección en el padre.
    // No es necesario desubscribirse de Observables proporcionados por
    // ActivatedRoute (ver https://angular.io/guide/router)
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
  }

  private getEmpleadoFromService(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.empleadosService.getEmpleado(id)
      .subscribe(empleado => this.empleado = empleado);
  }

  /*
   * Invocado cuando pulsamos el botón de guardar para crear o actualizar
   * un empleado
   */
  save() {
    this.empleadosDetalleService.empleadoActualizado(this.empleado);
  }

  close(): void {
    this.router.navigate([ '../..' ], { relativeTo: this.route });
  }

}
