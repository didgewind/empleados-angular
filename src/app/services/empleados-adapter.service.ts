import { MensajesService } from './mensajes.service';
import { EmpleadosMockService } from './empleados-mock.service';
import { Empleado } from './../model/empleado';
import { Observable } from 'rxjs';
import { EmpleadosIntService } from './empleados-int.service';
import { Injectable } from '@angular/core';
import { EmpleadosRestService } from './empleados-rest.service';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosAdapterService implements EmpleadosIntService {

  private empleadosService: EmpleadosIntService;

  constructor( empleadosService: EmpleadosRestService, private mensajesService: MensajesService ) {
    this.empleadosService = empleadosService;
  }

  getAllEmpleados(): Observable<Empleado[]> {
    this.mensajesService.add('Empleados recuperados');
    return this.empleadosService.getAllEmpleados();
  }

  addEmpleado(empleado: Empleado): Observable<Empleado> {
    this.mensajesService.add(`Añadido empleado con id=${empleado.id}`);
    return this.empleadosService.addEmpleado(empleado);
  }

  getEmpleado(id: number): Observable<Empleado> {
    this.mensajesService.add(`Recuperado el empleado con id=${id}`);
    return this.empleadosService.getEmpleado(id);
  }

  updateEmpleado (updatedEmpleado: Empleado): Observable<Empleado> {
    this.mensajesService.add(`Actualizado el empleado con id=${updatedEmpleado.id}`);
    return this.empleadosService.updateEmpleado(updatedEmpleado);
  }

}
