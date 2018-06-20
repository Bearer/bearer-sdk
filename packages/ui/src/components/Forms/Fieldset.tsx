export enum FieldType {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  TEL = 'tel',
  SUBMIT = 'submit',
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  SELECT = 'select'
}

export interface CheckableInput {
  label: string
  value: string
  default?: boolean
}

export interface Option {
  label: string
  value: string
  checked?: boolean
}

export interface Field {
  type: FieldType
  label: string
  controlName: string
  value?: string
  valueList?: Array<string>

  hint?: string
  placeholder?: string
  inline?: boolean
  buttons?: Array<CheckableInput>
  options?: Array<Option>
}

export class FieldSet {
  private set: Array<Field>

  constructor(set: Array<Field>) {
    this.set = set
  }

  get(controlName: string) {
    return this.set.find(el => el.controlName === controlName)
  }

  getValue(controlName: string) {
    return this.get(controlName).value
  }

  setValue(controlName: string, value: string) {
    this.set.map(el => {
      if (el.controlName === controlName) {
        el.value = value
        return el
      }
      return el
    })
  }

  map(func: (value: Field, index: number, array: Field[]) => {}) {
    return this.set.map(func)
  }
}
