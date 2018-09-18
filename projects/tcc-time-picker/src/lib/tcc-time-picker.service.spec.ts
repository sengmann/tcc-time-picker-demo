import { TestBed } from '@angular/core/testing';

import { TccTimePickerService } from './tcc-time-picker.service';

describe('TccTimePickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TccTimePickerService = TestBed.get(TccTimePickerService);
    expect(service).toBeTruthy();
  });
});
