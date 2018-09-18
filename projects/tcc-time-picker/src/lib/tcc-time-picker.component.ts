import { Component, forwardRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';

export interface Time {
  name: string;
}

@Component({
  selector: 'tcc-time-picker',
  template: `
    <mat-form-field>

  <input matInput placeholder="Uhrzeit" [matAutocomplete]="auto" [formControl]="innerControl" (blur)="onTouched($event)">

  <mat-autocomplete #auto="matAutocomplete">
    <mat-option *ngFor="let state of filteredTimes$ | async" [value]="state.name">{{state.name}}</mat-option>
  </mat-autocomplete>
</mat-form-field>
  `,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TccTimePickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TccTimePickerComponent),
      multi: true
    }

  ]
})
export class TccTimePickerComponent implements OnInit, ControlValueAccessor, Validator {

  innerControl: FormControl = new FormControl();
  filteredTimes$: Observable<Time[]>;
  changeFn: Function;
  onTouched: Function;

  times: Time[] = new Array(24)
    .fill(null)
    .map((it: null, index: number) => ({ name: `${index > 9 ? '' : 0}${index}:00` }));

  constructor() {
    // this.myControl.
    this.innerControl.valueChanges.subscribe(newValue => this.changeFn(newValue));
    this.filteredTimes$ = this.innerControl.valueChanges
      .pipe(
        startWith(''),
        map(time => time ? this._filterTimes(time) : this.times.slice())
      );
  }

  registerOnChange(fn: any): void {
    this.changeFn = fn;
  }


  ngOnInit() {
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.innerControl.patchValue(value, { emitEvent: false, onlySelf: true });
  }


  validate(c: FormControl) {
    // todo catch ',' errors
    // todo negative numbers
    // todo 24:59
    // todo ...
    // todo ...
    // todo ...
    const time = c.value;
    const errors: { [key: string]: boolean } = {};

    if (!validTimeformat(time)) {
      errors['invalidTime'] = true;
    }


    if (!validColon(time)) {
      errors['noColon'] = true;
    }


    if (!validHours(time)) {
      errors['hours'] = true;
    }

    if (!validMinutes(time)) {
      errors['minutes'] = true;
    }

    return errors;
  }

  private _filterTimes(value: string): Time[] {
    return this.times.filter(timeUnit => {
      const s = timeUnit.name.startsWith('0') ? timeUnit.name.substring(1) : timeUnit.name;
      return s.indexOf(value) === 0;
    });
  }

}


// Todo Unit Test
function validTimeformat(time: string) {
  return /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(time);
}

// Todo Unit Test
function validColon(time: string) {
  const isColonIncluded = time.includes(':');
  return isColonIncluded;
}


// Todo Unit Test
function validHours(time: string) {
  const hours = parseInt(time.split(':')[0], 10);
  return hours <= 24;
}

// Todo Unit Test
function validMinutes(time: string) {
  const minutes = parseInt(time.split(':')[1], 10);
  return minutes < 59;
}
