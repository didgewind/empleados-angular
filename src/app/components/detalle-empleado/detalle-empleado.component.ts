import { Empleado } from './../../empleado';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  @Input()
  empleado: Empleado;

  constructor() { }

  ngOnInit() {
  }

}
