import { Empleado } from './../../empleado';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  @Input() empleado: Empleado;
  @Output() addEmpleado: EventEmitter<Empleado> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.addEmpleado.emit(this.empleado);
  }
}
