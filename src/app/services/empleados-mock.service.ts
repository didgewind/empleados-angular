import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Empleado } from './../model/empleado';
import { EmpleadosIntService } from './empleados-int.service';

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

  constructor() { }

  getAllEmpleados(): Observable<Empleado[]> {
    return of(this.empleados);
  }

  addEmpleado(newEmpleado: Empleado): Observable<Empleado> {
    newEmpleado.id = this.nextId++;
    return of(newEmpleado);
  }

  getEmpleado(id: number): Observable<Empleado> {
    return of(this.empleados.find(empleado => empleado.id === id));
  }

  /*
    Todo esto en realidad no hace falta porque al modificar
    en un componente un objeto Empleado se modifica también en este
    array porque son el mismo objeto, pero está bien
    dejarlo aquí por si queremos simularlo mejor clonando
    los objetos al intercambiarlos con otras capas
  */
  updateEmpleado (updatedEmpleado: Empleado): Observable<Empleado> {
    const foundEmpleado = this.empleados.find((oldEmpleado, index) => {
      if (oldEmpleado.id === updatedEmpleado.id) {
        this.empleados[index] = updatedEmpleado;
        return true;
      }
    });
    // TODO: comprobar si foundEmpleado es undefined y entonces retornar error
    return of(foundEmpleado);
  }

  deleteEmpleado(empleadoToDelete: Empleado): Observable<Empleado> {
    this.empleados = this.empleados.filter(h => h !== empleadoToDelete);
    return of(empleadoToDelete);
  }
}
