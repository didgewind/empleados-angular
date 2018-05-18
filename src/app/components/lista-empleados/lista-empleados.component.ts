import { Empleado } from './../../empleado';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  empleado: Empleado = new Empleado('32452435H', 'Juan', 'Ruíz', 23);

  constructor() { }

  ngOnInit() {
  }

}
