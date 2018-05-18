import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListaEmpleadosComponent } from './components/lista-empleados/lista-empleados.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaEmpleadosComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
