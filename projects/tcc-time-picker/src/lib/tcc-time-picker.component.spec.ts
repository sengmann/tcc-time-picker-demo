import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TccTimePickerComponent } from './tcc-time-picker.component';

describe('TccTimePickerComponent', () => {
  let component: TccTimePickerComponent;
  let fixture: ComponentFixture<TccTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TccTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TccTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
