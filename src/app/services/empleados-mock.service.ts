import { MensajesService } from './mensajes.service';
import { Observable, of } from 'rxjs';
import { Empleado } from './../model/empleado';
import { EmpleadosIntService } from './empleados-int.service';
import { Injectable } from '@angular/core';

/*
 * Servicio mock de interacción con la fuente de datos
 */
@Injectable({
  providedIn: 'root'
})
export class EmpleadosMockService  implements EmpleadosIntService {

  private nextId = 18;

  private empleados: Empleado[] = [
    new Empleado(11, '32452435H', 'Juan', 'Ruíz', 23),
      { id: 12, cif: '23452348T', nombre: 'Narco', apellidos: 'Bollo', edad: 18 },
      { id: 13, cif: '63653653E', nombre: 'Amaia', apellidos: 'Valdemoro', edad: 29 },
      { id: 14, cif: '76548766O', nombre: 'Enrique', apellidos: 'Iglesias', edad: 87 },
      { id: 15, cif: '34665434Y', nombre: 'Jesús', apellidos: 'Tolondrón', edad: 45 },
      { id: 16, cif: '23676546Q', nombre: 'Olga', apellidos: 'Viza', edad: 56 },
      { id: 17, cif: '09879876O', nombre: 'Josune', apellidos: 'Goikoetxea', edad: 32 },
  ];

  constructor( private mensajesService: MensajesService ) { }

  getAllEmpleados(): Observable<Empleado[]> {
    this.mensajesService.add('Empleados recuperados');
    return of(this.empleados);
  }

  addEmpleado(newEmpleado: Empleado): Observable<Empleado> {
    newEmpleado.id = this.nextId++;
    this.mensajesService.add(`Añadido empleado con id=${newEmpleado.id}`);
    return of(newEmpleado);
  }

  getEmpleado(id: number): Observable<Empleado> {
    this.mensajesService.add(`Recuperado el empleado con id=${id}`);
    return of(this.empleados.find(empleado => empleado.id === id));
  }

}
