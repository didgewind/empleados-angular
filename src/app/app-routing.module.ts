import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetalleEmpleadoComponent } from './components/detalle-empleado/detalle-empleado.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/listaEmpleados', pathMatch: 'full' },
  { path: 'listaEmpleados', component: ListaEmpleadosComponent,
      children: [
        {
          path: 'detalle/:id',
          component: DetalleEmpleadoComponent
        },
        {
          path: 'nuevoEmpleado',
          component: DetalleEmpleadoComponent
        }

      ]
    },
  { path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: 'detalle/:id',
        component: DetalleEmpleadoComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }