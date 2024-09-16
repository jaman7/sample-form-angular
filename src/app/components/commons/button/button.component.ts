import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IButton } from './button.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() config: IButton | undefined;

  @Input() customClass: string | string[] = '';

  private _buttonConfiguration: IButton[] = [];

  buttonConfig$: Observable<IButton[]> = of([]);

  @Input() set buttonConfiguration(value: IButton[] | null) {
    this._buttonConfiguration = value ?? [];
    this.buttonConfig$ = of(this._buttonConfiguration);
  }

  @Output() btnClickId: EventEmitter<string | any> = new EventEmitter();

  @Output() btnClick: EventEmitter<MouseEvent> = new EventEmitter();

  onClickButton(event: MouseEvent, id?: string): void {
    this.btnClick.emit(event);
    this.btnClickId.emit(id);
  }
}
