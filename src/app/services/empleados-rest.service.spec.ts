import { TestBed, inject } from '@angular/core/testing';

import { EmpleadosRestService } from './empleados-rest.service';

describe('EmpleadosRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpleadosRestService]
    });
  });

  it('should be created', inject([EmpleadosRestService], (service: EmpleadosRestService) => {
    expect(service).toBeTruthy();
  }));
});
