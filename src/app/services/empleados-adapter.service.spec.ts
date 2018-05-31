import { TestBed, inject } from '@angular/core/testing';

import { EmpleadosAdapterService } from './empleados-adapter.service';

describe('EmpleadosAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpleadosAdapterService]
    });
  });

  it('should be created', inject([EmpleadosAdapterService], (service: EmpleadosAdapterService) => {
    expect(service).toBeTruthy();
  }));
});
