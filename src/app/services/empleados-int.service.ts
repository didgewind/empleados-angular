import { Observable } from 'rxjs';
import { Empleado } from './../empleado';

export interface EmpleadosIntService {

    getAllEmpleados(): Observable<Empleado[]>;
    addEmpleado(newEmpleado: Empleado): Observable<Empleado>;
    getEmpleado(id: number): Observable<Empleado>;
}
