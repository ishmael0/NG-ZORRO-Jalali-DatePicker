import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NGZORROJalaliDatePickerComponent } from './ng-zorro-jalali-date-picker.component';

describe('NGZORROJalaliDatePickerComponent', () => {
  let component: NGZORROJalaliDatePickerComponent;
  let fixture: ComponentFixture<NGZORROJalaliDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NGZORROJalaliDatePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NGZORROJalaliDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
