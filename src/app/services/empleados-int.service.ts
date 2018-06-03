import { Observable } from 'rxjs';
import { Empleado } from './../model/empleado';

/*
 * Interface de servicio de interacción con
 * la fuente de datos
 */
export interface EmpleadosIntService {

    getAllEmpleados(): Observable<Empleado[]>;
    addEmpleado(newEmpleado: Empleado): Observable<Empleado>;
    getEmpleado(id: number): Observable<Empleado>;
    updateEmpleado(updatedEmpleado: Empleado): Observable<Empleado>;
}
