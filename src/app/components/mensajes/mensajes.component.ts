import { MensajesService } from './../../services/mensajes.service';
import { Component, OnInit } from '@angular/core';

/*
 * Componente para mostrar mensajes en pantalla
 */
@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  constructor( public mensajesService: MensajesService ) { }

  ngOnInit() {
  }

}
