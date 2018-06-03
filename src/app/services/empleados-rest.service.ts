import { Observable } from 'rxjs';
import { Empleado } from './../model/empleado';
import { EmpleadosIntService } from './empleados-int.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosRestService implements EmpleadosIntService {

  private empleadosRestURL = environment.empleadosRestURL;

  constructor( private http: HttpClient ) { }

  getAllEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.empleadosRestURL);
  }

  addEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.empleadosRestURL, empleado);
  }

  getEmpleado(id: number): Observable<Empleado> {
    const url = `${this.empleadosRestURL}/${id}`;
    return this.http.get<Empleado>(url);
  }

  updateEmpleado (updatedEmpleado: Empleado): Observable<Empleado> {
    const url = `${this.empleadosRestURL}/${updatedEmpleado.id}`;
    return this.http.put<Empleado>(url, updatedEmpleado);
  }
}
