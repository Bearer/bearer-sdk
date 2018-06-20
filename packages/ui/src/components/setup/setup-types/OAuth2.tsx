import { SetupType } from './SetupType'
import { FieldSet, FieldType } from '../../Forms/Fieldset'

export const BearerOAuth2Setup: SetupType = {
  fields: new FieldSet([
    {
      label: 'Client ID',
      type: FieldType.TEXT,
      value: '',
      controlName: 'clientId'
    },
    {
      label: 'Client Secret',
      type: FieldType.PASSWORD,
      value: '',
      controlName: 'clientSecret'
    }
  ])
}
