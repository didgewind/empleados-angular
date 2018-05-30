import { Injectable } from '@angular/core';

/*
 * Servicio de comunicación entre productores y de mensajes
 * y el componente de mensajes
 */
@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  mensajes: string[] = [];

  add(mensaje: string) {
    this.mensajes.push(mensaje);
  }

  clear() {
    this.mensajes = [];
  }
}
