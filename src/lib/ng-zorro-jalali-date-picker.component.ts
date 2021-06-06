import { Component, OnInit, ChangeDetectionStrategy, Input, forwardRef, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-NG-ZORRO-Jalali-DatePicker',
  templateUrl: './ng-zorro-jalali-date-picker.component.html',
  styles: [
    `.ant-btn-primary.active{background-color:#d60063!important}`,
    `.ymb  [nz-button]{ margin-right: 8px;  }`,
    `.ymb i{ font-size:24px  }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NGZORROJalaliDatePickerComponent),
      multi: true
    }
  ]
})
export class NGZORROJalaliDatePickerComponent implements ControlValueAccessor {
  visible = false;
  icons = {
    'chevron-double-right': `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" /></svg>`,
    'chevron-right': `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>`,
    'chevron-double-left': `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z" /></svg>`,
    'chevron-left': `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg>`
  };
  @Input() io: 'shamsi' | 'miladi' = 'miladi';
  @Input() disabled = false;
  @Input() closeAfterClick = true;
  constructor(public cdr: ChangeDetectorRef) { }
  selected(d: number) {
    if (this.selected_day == d && this.selected_month == this.month && this.selected_year == this.year) {
      return true;
    }
    return false;
  }
  onChange = (value: string) => { };
  onTouched = () => { };
  writeValue(obj: string): void {
    if (this.io == 'shamsi' && obj && obj.length == 10) {
      this.year = +obj.substr(0, 4);
      this.month = +obj.substr(5, 2);
      this.day = +obj.substr(8, 2);
      this.set(false);
    }
    else if (this.io == 'miladi' && obj) {
      let t = obj.substr(0, 10).split('-');
      var conv = gregorian_to_jalali(+t[0], +t[1], + t[2])
      this.year = conv[0];
      this.month = conv[1];
      this.day = conv[2];
      this.set(false);
    }
    else {
      var d = new Date();
      let t = gregorian_to_jalali(d.getFullYear(), d.getMonth() + 1, d.getDate())
      this.year = t[0];
      this.month = t[1];
      this.day = t[2];
      this.refreshView();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }



  ngOnInit(): void {
  }
  value = "";
  value_ = "";
  year = 1400;
  month = 1;
  day = 12;

  selected_year = 0;
  selected_month = 0;
  selected_day = 0;


  daysInMOnth: any[] = [];
  getDayStartOfMonth(): number {
    var k = Math.floor((this.year) / 4);
    var y = ((this.year) * 365 + k);
    if (this.month <= 6)
      y = y + (this.month - 1) * 31;
    else
      y = y + 6 + (this.month - 1) * 30;

    return (y + 1) % 7;
  }
  set(back: boolean = true) {
    this.selected_day = this.day;
    this.selected_month = this.month;
    this.selected_year = this.year;
    this.value_ = this.year + "/" + this.month.toString().padStart(2, '0') + "/" + this.day.toString().padStart(2, '0');
    if (this.io == 'shamsi') {
      this.value = this.year + "/" + this.month.toString().padStart(2, '0') + "/" + this.day.toString().padStart(2, '0');
    }
    else if (this.io == 'miladi') {
      let conv = jalali_to_gregorian(this.year, this.month, this.day);
      this.value = conv[0] + "-" + conv[1].toString().padStart(2, '0') + "-" + conv[2].toString().padStart(2, '0');
    }
    if (back)
      this.onChange(this.value);
    if (this.closeAfterClick) this.visible = false;
    this.cdr.detectChanges();
  }
  dayList = [];
  change(variable: string, count: number) {
    if (variable == 'year')
      this.year += count;
    if (variable == 'month') {
      this.month += count;
      if (this.month < 1) {
        this.month += 12;
        this.year--;
      }
      else if (this.month > 12) {
        this.month -= 12;
        this.year++;
      }
    }
    if (variable == 'yearset')
      this.year = count;
    if (variable == 'monthset')
      this.month = count;

    this.refreshView();
  }
  refreshView() {

    let ds = this.getDayStartOfMonth();
    let monthDays = this.month < 7 ? 31 : (this.month < 12 ? 30 : (this.year % 4 == 3 ? 30 : 29));
    let temp = Array.from({ length: monthDays }).map((c, index) => index + 1);
    if (ds != 0)
      temp.unshift(...Array.from({ length: ds }).map(c => 0));
    this.daysInMOnth = Array.from({ length: Math.ceil(temp.length / 7) }).map(c => []);
    for (var i = 0; i < temp.length; i++) {
      this.daysInMOnth[Math.floor(i / 7)][i % 7] = temp[i];
    }
  }
  months = ["فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دي", "بهمن", "اسفند"];
}



export function gregorian_to_jalali(gy: number, gm: number, gd: number) {
  var g_d_m, jy, jm, jd, gy2, days;
  g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  gy2 = (gm > 2) ? (gy + 1) : gy;
  days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
  jy = -1595 + (33 * ~~(days / 12053));
  days %= 12053;
  jy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if (days < 186) {
    jm = 1 + ~~(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + ~~((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return [jy, jm, jd];
}
export function jalali_to_gregorian(jy: number, jm: number, jd: number) {
  var sal_a, gy, gm, gd, days;
  jy += 1595;
  days = -355668 + (365 * jy) + (~~(jy / 33) * 8) + ~~(((jy % 33) + 3) / 4) + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
  gy = 400 * ~~(days / 146097);
  days %= 146097;
  if (days > 36524) {
    gy += 100 * ~~(--days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }
  gy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    gy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  gd = days + 1;
  sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
  return [gy, gm, gd];
}
