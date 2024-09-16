import { IFormElements } from '@app/components/commons/form-elements/form-elements.models';

export function setFormConfig(
  formConfig,
  params: {
    prefix?: string;
  } = {}
): IFormElements[] {
  return Object.keys(formConfig).map(key => {
    const { prefix } = params;
    const { config } = formConfig[key];
    const { placeholder, type, formCellType, step, precision, min, max, header, headerKey, minRows, maxRows, value } = config || {};

    return {
      formControlName: key,
      type,
      config: {
        ...(config ?? {}),
        prefix,
        header: header ?? `${prefix}.${headerKey ?? key}`,
        formCellType: !value ? (formCellType ?? 'input') : null,
        order: true,
        placeholder: placeholder ?? `${prefix}.${headerKey ?? key}`,
        step: step ?? 1,
        precision: precision ?? 0,
        min: min ?? 0,
        max: max ?? 100000000000,
        minRows: minRows ?? 2,
        maxRows: maxRows ?? 6,
      },
    };
  });
}
