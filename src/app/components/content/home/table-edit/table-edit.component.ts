import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IFormElements } from '@app/components/commons/form-elements/form-elements.models';
import { setFormConfig } from '@app/shared/utils/forms';
import { IModal } from '@app/components/commons/universal-dialog/universal-dialog.models';
import { OpenDocTypeEnum } from '@app/shared/enums';
import { TableEditService } from './table-edit.service';
import { IHomeData, IHomeDataForm } from '../home.model';

const { SHOW, ADD } = OpenDocTypeEnum;

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
})
export class TableEditComponent extends TableEditService implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter<any>();

  data: { rowData?: IHomeData; modal?: IModal } = {};

  form: FormGroup<IHomeDataForm> = new FormGroup<IHomeDataForm>({
    id: new UntypedFormControl(null),
    name: new UntypedFormControl(null, [Validators.required]),
    position: new UntypedFormControl(null, [Validators.required]),
    symbol: new UntypedFormControl(null, [Validators.required]),
    weight: new UntypedFormControl(null, [Validators.required]),
  });

  formGroupConfig: Observable<IFormElements[]> = of(
    setFormConfig(this.formConfig, {
      prefix: `${this.translatePrefix}.form`,
    })
  );

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.data = {};
  }

  init(): void {
    const { id } = this.data?.rowData || {};
    if (id) this.form.patchValue({ ...this.data.rowData });
    this.setFormOpenType();
  }

  setFormOpenType(): void {
    const { type } = this.data.modal || {};
    if (type === ADD) {
      this.form.reset();
    } else if (type === SHOW) {
      this.form.disable();
    }
  }

  onClickClose(): void {
    this.closeModal.emit(this.form.getRawValue());
  }

  onClickOk(): void {
    this.closeModal.emit(this.form.getRawValue());
  }

  get isModalTypeShow(): boolean {
    return this.data?.modal?.type === SHOW;
  }
}
