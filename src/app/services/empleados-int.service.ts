import { Observable } from 'rxjs';
import { Empleado } from './../empleado';

export interface EmpleadosIntService {

    getAllEmpleados(): Observable<Empleado[]>;
    getEmpleado(id: number): Observable<Empleado>;
}
