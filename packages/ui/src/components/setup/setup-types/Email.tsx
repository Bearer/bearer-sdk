import { SetupType } from './SetupType'
import { FieldSet, FieldType } from '../../Forms/Fieldset'

export const BearerEmailSetup: SetupType = {
  fields: new FieldSet([
    {
      label: 'Email',
      type: FieldType.TEXT,
      value: '',
      controlName: 'email'
    },
    {
      label: 'Password',
      type: FieldType.PASSWORD,
      value: '',
      controlName: 'password'
    }
  ])
}
