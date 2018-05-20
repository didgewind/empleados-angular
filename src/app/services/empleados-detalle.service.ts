import { Empleado } from './../empleado';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosDetalleService {

  private detallesEmpleadoSource = new Subject<Empleado>();
  private nuevoEmpleadoSource = new Subject<Empleado>();

  detallesEmpleado$ = this.detallesEmpleadoSource.asObservable();
  nuevoEmpleado$ = this.nuevoEmpleadoSource.asObservable();

  constructor() { }

  actualizaDetallesEmpleado(empleado: Empleado) {
    this.detallesEmpleadoSource.next(empleado);
  }

  nuevoEmpleadoCreado(empleado: Empleado) {
    this.nuevoEmpleadoSource.next(empleado);
  }

}
