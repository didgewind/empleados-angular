import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../empleado';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  empleadoSeleccionado: Empleado;

  empleados: Empleado[];

  constructor( private empleadosService: EmpleadosMockService) { }

  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados() {
    this.empleadosService.getAllEmpleados().subscribe(
      empleados => this.empleados = empleados
    );
  }

  onSelect(empleado: Empleado) {
    this.empleadoSeleccionado = empleado;
  }

  nuevoEmpleado() {
    this.empleadoSeleccionado = new Empleado();
  }

  onNewEmpleado(empleado: Empleado) {
    this.empleados.push(empleado);
    this.empleadosService.addEmpleado(empleado);
  }
}
