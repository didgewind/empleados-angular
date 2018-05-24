import { EmpleadosDetalleService } from './../../services/empleados-detalle.service';
import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../empleado';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {

  empleados: Empleado[];
  empleadoSeleccionado: Empleado;

  constructor(
    private empleadosService: EmpleadosMockService,
    private empleadosDetalleService: EmpleadosDetalleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getEmpleadosFromService();
    this.empleadosDetalleService.nuevoEmpleado$.subscribe(
      empleadoNuevo => {
        this.empleadosService.addEmpleado(empleadoNuevo).subscribe(
          empleado => {
            this.empleados.push(empleado);
            this.empleadoSeleccionado = empleado;
        });
      }
    );

  }

  getEmpleadosFromService() {
    this.empleadosService.getAllEmpleados().subscribe(
      empleados => {
        this.empleados = empleados;
        const firstChild = this.route.snapshot.firstChild;
        if (firstChild) {
          const id = +firstChild.paramMap.get('id');
          this.empleadoSeleccionado = this.empleados.find(empleado => empleado.id === id);
        }
      });
  }

  onSelect(empleado: Empleado) {
    this.empleadoSeleccionado = empleado;
    this.router.navigate(['/listaEmpleados/detalle/' + empleado.id]);
    this.empleadosDetalleService.actualizaDetallesEmpleado(empleado);
  }

  nuevoEmpleado() {
    this.router.navigate(['/listaEmpleados/nuevoEmpleado/']);
  }
}
