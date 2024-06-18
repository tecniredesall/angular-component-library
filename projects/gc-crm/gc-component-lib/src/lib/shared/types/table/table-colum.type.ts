export enum EGCCLTableColumnType {
  Text = 'text',
  Number = 'number',
  Status = 'status',
  Currency = 'currency',
  Date = 'date',
  Boolean = 'boolean',
  Email = 'email',
  Phone = 'phone',
  InputCurrency = 'input_currency',
  Weight = 'weight',
  WeightConversion = 'weight_conversion',
  Icon = 'icon',
}

export type TGCCLTableColumnType = `${EGCCLTableColumnType}`;
