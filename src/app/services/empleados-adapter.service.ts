import { MensajesService } from './mensajes.service';
import { EmpleadosMockService } from './empleados-mock.service';
import { Empleado } from './../model/empleado';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
    return this.empleadosService.getAllEmpleados()
      .pipe(
        tap(empleados => this.log('Empleados recuperados')),
        catchError(this.handleError('getEmpleados', []))
      );
  }

  getEmpleado(id: number): Observable<Empleado> {
    return this.empleadosService.getEmpleado(id)
      .pipe(
        tap(_ => this.log(`Empleado con id=${id} recuperado`)),
        catchError(this.handleError<Empleado>(`getEmpleado id=${id}`))
      );
  }

  updateEmpleado (empleado: Empleado): Observable<Empleado> {
    return this.empleadosService.updateEmpleado(empleado).pipe(
        tap(_ => this.log(`empleado con id=${empleado.id} actualizado`)),
        catchError(this.handleError<any>(`updateEmpleado id=${empleado.id}`))
    );
  }

  addEmpleado(newEmpleado: Empleado): Observable<Empleado> {
    return this.empleadosService.addEmpleado(newEmpleado).pipe(
      tap((empleado: Empleado) => this.log(`empleado con id=${empleado.id} añadido`)),
      catchError(this.handleError<any>(`addEmpleado nombre=${newEmpleado.nombre}`))
    );
  }

  deleteEmpleado(empleadoToDelete: Empleado): Observable<Empleado> {
    return this.empleadosService.deleteEmpleado(empleadoToDelete).pipe(
      tap(_ => this.log(`${empleadoToDelete.nombre} eliminada`)),
      catchError(this.handleError<any>(`deleteEmpleado id=${empleadoToDelete.id}`))
    );
  }

  private log(mensaje: string): void {
    this.mensajesService.add(mensaje);
    console.log(mensaje);
  }

  /* Devuelve una función que es la que invoca catchError */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
