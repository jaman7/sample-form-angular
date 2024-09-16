import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormControl } from '@angular/forms';
import { ConfigDefault, IInput } from './input.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line no-use-before-define
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, AfterViewInit {
  _config: IInput = ConfigDefault();

  @Input() formControl: UntypedFormControl;

  @Input()
  set config(configSet: Partial<IInput>) {
    this._config = { ...this._config, ...configSet };
  }

  get config(): IInput {
    return this._config;
  }

  @Input() value: any = null;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  propagateChange: any = () => {};

  propagateTouch: any = () => {};

  isDisabled(): boolean {
    return this.formControl?.disabled ?? false;
  }

  writeValue(inputValue: any): void {
    this.value = inputValue;
  }

  registerOnChange(fn: () => void): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.propagateTouch = fn;
  }

  onValueChange(value: any): void {
    this.valueChange.emit(value);
  }

  modelChange(event: any): void {
    let value = event;
    if (this.config.type === 'number') value = value ? +value : null;
    this.valueChange.emit(value);
    setTimeout(() => {
      this.propagateChange(value);
    }, 1);
  }

  onBlur(): void {
    this.propagateTouch();
  }
}
