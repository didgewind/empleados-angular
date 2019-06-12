import { EmpleadosAdapterService } from './../../services/empleados-adapter.service';
import { EmpleadosDetalleService } from './../../services/empleados-detalle.service';
import { EmpleadosMockService } from './../../services/empleados-mock.service';
import { Empleado } from './../../model/empleado';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

/*
 * Componente que muestra los detalles de un empleado. El empleado a mostrar
 * lo obtendrá bien directamente del servicio (si estamos mostrando una
 * nueva instancia del componente) o a través del servicio de comunicación
 * (si ya estamos mostrando el componente y seleccionamos un empleado nuevo
 * en la lista o en el dashboard). Utilizamos un formulario reactivo agrupando
 * todos los formcontrol en un formgroup (inicializamos el formgroup con un
 * objeto Empleado)
 */
@Component({
  selector: 'app-detalle-empleado-reactive',
  templateUrl: './detalle-empleado-reactive.component.html',
  styleUrls: ['./detalle-empleado-reactive.component.css']
})
export class DetalleEmpleadoReactiveComponent implements OnInit {

  empleado: Empleado;
  empForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private empleadosService: EmpleadosAdapterService,
    private empleadosDetalleService: EmpleadosDetalleService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.empForm = this.createFormGroup();
   }

  /* Creación del FormGroup*/
  private createFormGroup(): FormGroup {
    return this.formBuilder.group(new Empleado());
  }


  ngOnInit(): void {
    // Comprobar la ruta de petición. Si es /detalle hacer this.getEmpleado,
    // si es /nuevoEmpleado hacer un new sobre this.empleado
    // Al subscribirnos a la url el callback es invocado cuando ésta cambia,
    // por lo que ahora sí se actualiza el empleado a mostrar aunque
    // el componente no se redibuje, por lo que podemos prescindir del
    // Observable de notificación de nueva selección en el padre.
    // No es necesario desubscribirse de Observables proporcionados por
    // ActivatedRoute (ver https://angular.io/guide/router)
    this.route.url.subscribe(
      segments => segments.forEach(
        segment => {
          switch (segment.path) {

            case 'detalle':
              this.getEmpleadoFromService();
              break;

            case 'nuevoEmpleado':
              this.empleado = new Empleado();
              break;
          }
          this.updateForm();
        }
      )
    );
  }

  private getEmpleadoFromService(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.empleadosService.getEmpleado(id)
      .subscribe(empleado => this.empleado = empleado);
  }

  /* Actualiza el formulario con los valores del empleado actual */
  private updateForm() {
    const form = this.empForm;
    form.get('cif').setValue(this.empleado.cif);
    form.get('nombre').setValue(this.empleado.nombre);
    form.get('apellidos').setValue(this.empleado.apellidos);
    form.get('edad').setValue(this.empleado.edad);
  }

  /*
   * Invocado cuando pulsamos el botón de guardar para crear o actualizar
   * un empleado
   */
  save() {
    this.updateEmpleadoFromForm();
    console.log(this.empleado);
    this.empleadosDetalleService.empleadoActualizado(this.empleado);
  }

  /* Actualiza el empleado actual con los valores del formulario */
  private updateEmpleadoFromForm() {
    const form = this.empForm.value;
    this.empleado.cif = form.cif;
    this.empleado.nombre = form.nombre;
    this.empleado.apellidos = form.apellidos;
    this.empleado.edad = form.edad;
  }

  close(): void {
    // Cambiar por un close del componente de alguna manera
    // Quizás navegar a la ruta padre?
    this.location.back();
  }

  /* Métodos get de ayuda para acceso fácil desde el template */
  get cif() { return this.empForm.get('cif'); }
  get nombre() { return this.empForm.get('nombre'); }
  get apellidos() { return this.empForm.get('apellidos'); }
  get edad() { return this.empForm.get('edad'); }

}
