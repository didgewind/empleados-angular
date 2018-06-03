import { Empleado } from './../model/empleado';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/*
 * Clase de intercambio de info entre DetalleEmpleado y sus padres.
 * Utiliza Subjects y sus correspondientes Observables
 */
@Injectable({
  providedIn: 'root'
})
export class EmpleadosDetalleService {

  private empleadoActualizadoSource = new Subject<Empleado>();

  empleadoActualizado$ = this.empleadoActualizadoSource.asObservable();

  constructor() { }

  empleadoActualizado(empleado: Empleado) {
    this.empleadoActualizadoSource.next(empleado);
  }

}
