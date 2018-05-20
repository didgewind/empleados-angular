import { EmpleadosDetalleService } from './../../services/empleados-detalle.service';
import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../empleado';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  empleados: Empleado[];

  constructor(
    private empleadosService: EmpleadosMockService,
    private empleadosDetalleService: EmpleadosDetalleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEmpleados();
  }

  getEmpleados() {
    this.empleadosService.getAllEmpleados().subscribe(
      empleados => this.empleados = empleados
    );
  }

  onSelect(empleado: Empleado) {
    this.router.navigate(['/listaEmpleados/detalle/' + empleado.id]);
    this.empleadosDetalleService.actualizaDetallesEmpleado(empleado);
  }

}
