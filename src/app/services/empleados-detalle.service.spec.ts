import { TestBed, inject } from '@angular/core/testing';

import { EmpleadosDetalleService } from './empleados-detalle.service';

describe('EmpleadosDetalleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpleadosDetalleService]
    });
  });

  it('should be created', inject([EmpleadosDetalleService], (service: EmpleadosDetalleService) => {
    expect(service).toBeTruthy();
  }));
});
