import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../empleado';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {

  @Input()
  empleado: Empleado;

  constructor(
    private route: ActivatedRoute,
    private empleadosService: EmpleadosMockService,
    private location: Location
  ) { }


  ngOnInit(): void {
    this.getEmpleado();
  }

  getEmpleado(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.empleadosService.getEmpleado(id)
      .subscribe(empleado => this.empleado = empleado);
  }

}
