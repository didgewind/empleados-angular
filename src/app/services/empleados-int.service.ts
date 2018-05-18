import { Observable } from 'rxjs';
import { Empleado } from './../empleado';

export interface EmpleadosIntService {

    getAllEmpleados(): Observable<Empleado[]>;

}
