import { Empleado } from './../empleado';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosDetalleService {

  private detallesEmpleadoSource = new Subject<Empleado>();

  // Observable string streams
  detallesEmpleado$ = this.detallesEmpleadoSource.asObservable();

  constructor() { }

  actualizaDetallesEmpleado(empleado: Empleado) {
    this.detallesEmpleadoSource.next(empleado);
  }
}
