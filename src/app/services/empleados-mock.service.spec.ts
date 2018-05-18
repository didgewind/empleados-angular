import { TestBed, inject } from '@angular/core/testing';

import { EmpleadosMockService } from './empleados-mock.service';

describe('EmpleadosMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpleadosMockService]
    });
  });

  it('should be created', inject([EmpleadosMockService], (service: EmpleadosMockService) => {
    expect(service).toBeTruthy();
  }));
});
