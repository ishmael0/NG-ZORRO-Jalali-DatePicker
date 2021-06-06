import { TestBed } from '@angular/core/testing';

import { NGZORROJalaliDatePickerService } from './ng-zorro-jalali-date-picker.service';

describe('NGZORROJalaliDatePickerService', () => {
  let service: NGZORROJalaliDatePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NGZORROJalaliDatePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
