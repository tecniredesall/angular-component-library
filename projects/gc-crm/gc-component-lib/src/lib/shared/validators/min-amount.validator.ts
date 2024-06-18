import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { GCCLQuantityStringToNumber } from '../helpers/formatted-quantity';

export function MinAmountValidator(
  amount: number,
  languageCode: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;

    if (!value || value.length === 0) {
      return null;
    }

    const inputAmount = GCCLQuantityStringToNumber(value, languageCode);
    return inputAmount <= amount
      ? { min: { min: amount, actual: inputAmount } }
      : null;
  };
}
