import { EmpleadosAdapterService } from './../../services/empleados-adapter.service';
import { EmpleadosRestService } from './../../services/empleados-rest.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EmpleadosDetalleService } from './../../services/empleados-detalle.service';
import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../model/empleado';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/*
 * Componente que muestra todos los empleados en forma de lista
 */
@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit, OnDestroy {

  empleados: Empleado[];
  empleadoSeleccionado: Empleado;
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(
    private empleadosService: EmpleadosAdapterService,
    private empleadosDetalleService: EmpleadosDetalleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Recuperamos empleados del servicio
    this.getEmpleadosFromService();
    // Nos subscribimos al Observable del servicio de comunicaciones
    // con detalle-empleado para recibir los detalles de los empleados
    // creados o actualizados
    this.empleadosDetalleService.empleadoActualizado$.pipe(
      takeUntil(this.ngUnsubscribe)) // Para desubscribirnos en el ngDestroy
      .subscribe(
        // Cuando recibimos un empleado nuevo o actualizado del componente DetalleEmpleado
        // se lo comunicamos al servicio
        empleadoNuevo => {
          /* Se trata de un empleado nuevo. Lo comunicamos al servicio
             y cuando éste responde añadimos el empleado al array */
          if (empleadoNuevo.id === 0) {
            this.empleadosService.addEmpleado(empleadoNuevo).subscribe(
              empleado => {
                this.empleados.push(empleado);
                this.empleadoSeleccionado = empleado;
            });
          } else {  // Estamos actualizando el empleado
            this.empleadosService.updateEmpleado(empleadoNuevo).subscribe(
              empleado => {
                this.empleados.find((oldEmpleado, index) => {
                  if (oldEmpleado.id === empleado.id) {
                    this.empleados[index] = empleado;
                    return true;
                  }
                });
                // TODO: deshabilitar el botón de guardar?
            });
          }
      });
  }

  /*
   * Para desubscribirnos del Subject/Observable this.empleadosDetalleService.nuevoEmpleado$
   * (visto en https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription)
   * Siendo una subscripción sólo podríamos desubscribirnos recibiendo el objeto subscription
   * al subscribirnos e invocando unsubscribe() en ngOnDestroy
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private getEmpleadosFromService() {
    // Recibimos los empleados del servicio
    this.empleadosService.getAllEmpleados().subscribe(
      empleados => {
        this.empleados = empleados;
        // Comprobamos si estamos en la ruta 'detalle' (hemos accedido
        // entonces directamente a ella) para actualizar el empleado seleccionado
        // y que aparezca marcado en el html
        const firstChild = this.route.snapshot.firstChild;
        if (firstChild) {
          const id = +firstChild.paramMap.get('id');
          this.empleadoSeleccionado = this.empleados.find(empleado => empleado.id === id);
        }
      });
  }

  onSelect(empleado: Empleado) {
    // Se ha seleccionado un nuevo empleado. Navegamos a la nueva ruta
    // Ya no es necesario comunicarlo a DetalleEmpleado pues éste
    // está subscrito a los cambios en la url
    this.empleadoSeleccionado = empleado;
    this.router.navigate(['/listaEmpleados/detalle/' + empleado.id]);
  }

  /*
   * Oyente del botón de nuevo empleado
   */
  nuevoEmpleado() {
    this.router.navigate(['/listaEmpleados/nuevoEmpleado/']);
  }

  deleteEmpleado(empleado: Empleado): void {
    this.empleadosService.deleteEmpleado(empleado).subscribe(
      () => this.empleados = this.empleados.filter(h => h !== empleado));
  }
}
