import { NgModule } from '@angular/core';
import { NGZORROJalaliDatePickerComponent } from './ng-zorro-jalali-date-picker.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  declarations: [
    NGZORROJalaliDatePickerComponent,
  ],
  imports: [
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzInputNumberModule,
    NzPopoverModule,
    NzSelectModule
  ],
  exports: [
    NGZORROJalaliDatePickerComponent
  ]
})
export class NGZORROJalaliDatePickerModule { }
